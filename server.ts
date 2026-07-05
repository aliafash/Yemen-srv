import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemInstruction || "أنت المساعد الذكي WAM لموقع وتطبيق 'كل خدمات اليمن' (دليل الخدمات والمحترفين في اليمن). مطور التطبيق هو WAM2026. رقم الدعم والاتصال هو 777644. أجب دائماً باللغة العربية بلهجة يمنية ودودة ومرحبة ومختصرة. ساعد المستخدم في معرفة المهن المتوفرة (السباكة، الكهرباء، التعليم، الرعاية الصحية، النقل، والخدمات التقنية) وكيفية الحجز. إذا سألوا عن معلومات سرية أو كلمات مرور، اعتذر بلطف دون إعطائهم أي شيء.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "عذراً، لم أستطع معالجة هذا الطلب حالياً." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "حدث خطأ أثناء معالجة الطلب في خادم المساعد الذكي.",
      details: error.message 
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
