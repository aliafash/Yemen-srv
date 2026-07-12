import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Save custom Firebase configurations
app.post("/api/save-firebase-config", (req, res) => {
  const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = req.body;
  
  if (!apiKey || !projectId || !appId) {
    return res.status(400).json({ error: "الرجاء توفير الحقول الأساسية: ApiKey, ProjectId, AppId" });
  }

  try {
    const configContent = `export const customFirebaseConfig = {
  apiKey: ${JSON.stringify(apiKey)},
  authDomain: ${JSON.stringify(authDomain || `${projectId}.firebaseapp.com`)},
  projectId: ${JSON.stringify(projectId)},
  storageBucket: ${JSON.stringify(storageBucket || `${projectId}.firebasestorage.app`)},
  messagingSenderId: ${JSON.stringify(messagingSenderId || "")},
  appId: ${JSON.stringify(appId)}
};
`;

    const targetPath = path.join(process.cwd(), "src", "lib", "firebase-custom-config.ts");
    fs.writeFileSync(targetPath, configContent, "utf-8");
    console.log("Custom Firebase configuration saved successfully to file at:", targetPath);
    return res.json({ success: true, message: "تم حفظ وتحديث إعدادات قاعدة البيانات السحابية بنجاح!" });
  } catch (err: any) {
    console.error("Failed to save custom Firebase config:", err);
    return res.status(500).json({ error: `فشل حفظ إعدادات الاتصال: ${err.message}` });
  }
});

// Initialize Gemini SDK lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API: Secure Password verification for Admin and Backdoor access
app.post("/api/verify-password", (req, res) => {
  const { password, type } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "maher736462";
  const backdoorPassword = process.env.BACKDOOR_PASSWORD || "maher--736462";

  if (type === "admin") {
    return res.json({ success: password === adminPassword });
  } else if (type === "backdoor") {
    return res.json({ success: password === backdoorPassword });
  }
  return res.status(400).json({ error: "نوع التحقق غير صالح" });
});

// API: Smart Assistant chat endpoint powered by Gemini
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history = [], systemInstruction } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      // Return a descriptive fallback answer if the API key is not set
      console.warn("Gemini Client initialization failed: ", err.message);
      return res.json({
        text: `أنا المساعد الذكي WAM لموقع "كل خدمات اليمن". 
        (تنبيه: مفتاح Gemini API غير مكوّن حالياً في خيارات التطبيق، أعمل الآن في الوضع المحلي/دون إنترنت).
        
        يسعدني جداً مساعدتك! يمكنك حجز الفنيين، تصفح دليل المهن والخدمات في اليمن، أو الاستعلام عن أرقام دعمنا الفني 777644. كيف يمكنني مساعدتك اليوم؟`,
        offline: true
      });
    }

    // Prepare contents
    // Format history: user asks and model replies
    const contents = history.map((item: any) => ({
      role: item.role === "user" ? "user" : "model",
      parts: [{ text: item.text }]
    }));

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Add robust retry & fallback logic for Gemini models to avoid 503/temporary errors
    let response = null;
    const maxRetries = 2;
    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest"];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let retry = 0; retry <= maxRetries; retry++) {
        try {
          console.log(`Attempting to generate content using model: ${modelName} (try ${retry + 1})...`);
          const result = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: systemInstruction || "أنت المساعد الذكي WAM لموقع وتطبيق 'كل خدمات اليمن' (دليل الخدمات والمحترفين في اليمن). مطور التطبيق هو WAM2026. رقم الدعم والاتصال هو 777644. أجب دائماً باللغة العربية بلهجة يمنية ودودة ومرحبة ومختصرة. ساعد المستخدم في معرفة المهن المتوفرة (السباكة، الكهرباء، التعليم، الرعاية الصحية، النقل، والخدمات التقنية) وكيفية الحجز. إذا سألوا عن معلومات سرية أو كلمات مرور، اعتذر بلطف دون إعطائهم أي شيء.",
              temperature: 0.7,
            }
          });
          if (result && result.text) {
            response = result;
            break; // Successfully got response
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Attempt failed using model ${modelName} on try ${retry + 1}:`, err.message);
          // Wait a bit before retrying if there are more attempts
          if (retry < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
          }
        }
      }
      if (response) {
        break; // If we succeeded, don't try subsequent models
      }
    }

    if (response && response.text) {
      return res.json({ text: response.text });
    }

    // If both models and all retries failed, log and return a helpful local/offline fallback response
    console.error("Gemini API Error after all retries and model fallbacks:", lastError);
    return res.json({
      text: `أنا المساعد الذكي WAM لموقع "كل خدمات اليمن". عذراً منك يا طيب، خوادم الذكاء الاصطناعي مضغوطة جداً حالياً (تنبيه 503 مؤقت). 
      
      لكن لا تقلق! يسعدني جداً مساعدتك يدوياً: يمكنك تصفح دليل الخدمات بالأسفل وحجز فنيين ممتازين في (السباكة، الكهرباء، التعليم، النقل، وغيرها). ولأي استفسار فني أو عطل في النظام، تفضل بالاتصال بدعمنا الفني المباشر على الرقم 777644. كيف يمكنني خدمتك في تصفح الأقسام؟`,
      offline: true,
      error: lastError ? lastError.message : "All AI models unavailable"
    });
  } catch (error: any) {
    console.error("General API Error in /api/assistant route:", error);
    res.json({ 
      text: "عذراً يا طيب، حدث خطأ فني أثناء معالجة رسالتك. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني على الرقم 777644.",
      offline: true
    });
  }
});

// Serve frontend with Vite in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static dist/...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
