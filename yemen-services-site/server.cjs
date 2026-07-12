var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
app.post("/api/save-firebase-config", (req, res) => {
  const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = req.body;
  if (!apiKey || !projectId || !appId) {
    return res.status(400).json({ error: "\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u0648\u0641\u064A\u0631 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629: ApiKey, ProjectId, AppId" });
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
    const targetPath = import_path.default.join(process.cwd(), "src", "lib", "firebase-custom-config.ts");
    import_fs.default.writeFileSync(targetPath, configContent, "utf-8");
    console.log("Custom Firebase configuration saved successfully to file at:", targetPath);
    return res.json({ success: true, message: "\u062A\u0645 \u062D\u0641\u0638 \u0648\u062A\u062D\u062F\u064A\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u062D\u0627\u0628\u064A\u0629 \u0628\u0646\u062C\u0627\u062D!" });
  } catch (err) {
    console.error("Failed to save custom Firebase config:", err);
    return res.status(500).json({ error: `\u0641\u0634\u0644 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644: ${err.message}` });
  }
});
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.post("/api/verify-password", (req, res) => {
  const { password, type } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "maher736462";
  const backdoorPassword = process.env.BACKDOOR_PASSWORD || "maher--736462";
  if (type === "admin") {
    return res.json({ success: password === adminPassword });
  } else if (type === "backdoor") {
    return res.json({ success: password === backdoorPassword });
  }
  return res.status(400).json({ error: "\u0646\u0648\u0639 \u0627\u0644\u062A\u062D\u0642\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
});
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history = [], systemInstruction } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err) {
      console.warn("Gemini Client initialization failed: ", err.message);
      return res.json({
        text: `\u0623\u0646\u0627 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A WAM \u0644\u0645\u0648\u0642\u0639 "\u0643\u0644 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u064A\u0645\u0646". 
        (\u062A\u0646\u0628\u064A\u0647: \u0645\u0641\u062A\u0627\u062D Gemini API \u063A\u064A\u0631 \u0645\u0643\u0648\u0651\u0646 \u062D\u0627\u0644\u064A\u0627\u064B \u0641\u064A \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u060C \u0623\u0639\u0645\u0644 \u0627\u0644\u0622\u0646 \u0641\u064A \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u062D\u0644\u064A/\u062F\u0648\u0646 \u0625\u0646\u062A\u0631\u0646\u062A).
        
        \u064A\u0633\u0639\u062F\u0646\u064A \u062C\u062F\u0627\u064B \u0645\u0633\u0627\u0639\u062F\u062A\u0643! \u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0627\u0644\u0641\u0646\u064A\u064A\u0646\u060C \u062A\u0635\u0641\u062D \u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u0647\u0646 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0641\u064A \u0627\u0644\u064A\u0645\u0646\u060C \u0623\u0648 \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0639\u0646 \u0623\u0631\u0642\u0627\u0645 \u062F\u0639\u0645\u0646\u0627 \u0627\u0644\u0641\u0646\u064A 777644. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0627\u0644\u064A\u0648\u0645\u061F`,
        offline: true
      });
    }
    const contents = history.map((item) => ({
      role: item.role === "user" ? "user" : "model",
      parts: [{ text: item.text }]
    }));
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });
    let response = null;
    const maxRetries = 2;
    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest"];
    let lastError = null;
    for (const modelName of modelsToTry) {
      for (let retry = 0; retry <= maxRetries; retry++) {
        try {
          console.log(`Attempting to generate content using model: ${modelName} (try ${retry + 1})...`);
          const result = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: systemInstruction || "\u0623\u0646\u062A \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A WAM \u0644\u0645\u0648\u0642\u0639 \u0648\u062A\u0637\u0628\u064A\u0642 '\u0643\u0644 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u064A\u0645\u0646' (\u062F\u0644\u064A\u0644 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u062D\u062A\u0631\u0641\u064A\u0646 \u0641\u064A \u0627\u0644\u064A\u0645\u0646). \u0645\u0637\u0648\u0631 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0647\u0648 WAM2026. \u0631\u0642\u0645 \u0627\u0644\u062F\u0639\u0645 \u0648\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0647\u0648 777644. \u0623\u062C\u0628 \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0628\u0644\u0647\u062C\u0629 \u064A\u0645\u0646\u064A\u0629 \u0648\u062F\u0648\u062F\u0629 \u0648\u0645\u0631\u062D\u0628\u0629 \u0648\u0645\u062E\u062A\u0635\u0631\u0629. \u0633\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0647\u0646 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629 (\u0627\u0644\u0633\u0628\u0627\u0643\u0629\u060C \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621\u060C \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u060C \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629\u060C \u0627\u0644\u0646\u0642\u0644\u060C \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u062A\u0642\u0646\u064A\u0629) \u0648\u0643\u064A\u0641\u064A\u0629 \u0627\u0644\u062D\u062C\u0632. \u0625\u0630\u0627 \u0633\u0623\u0644\u0648\u0627 \u0639\u0646 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0633\u0631\u064A\u0629 \u0623\u0648 \u0643\u0644\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u060C \u0627\u0639\u062A\u0630\u0631 \u0628\u0644\u0637\u0641 \u062F\u0648\u0646 \u0625\u0639\u0637\u0627\u0626\u0647\u0645 \u0623\u064A \u0634\u064A\u0621.",
              temperature: 0.7
            }
          });
          if (result && result.text) {
            response = result;
            break;
          }
        } catch (err) {
          lastError = err;
          console.warn(`Attempt failed using model ${modelName} on try ${retry + 1}:`, err.message);
          if (retry < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 1e3 * (retry + 1)));
          }
        }
      }
      if (response) {
        break;
      }
    }
    if (response && response.text) {
      return res.json({ text: response.text });
    }
    console.error("Gemini API Error after all retries and model fallbacks:", lastError);
    return res.json({
      text: `\u0623\u0646\u0627 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A WAM \u0644\u0645\u0648\u0642\u0639 "\u0643\u0644 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u064A\u0645\u0646". \u0639\u0630\u0631\u0627\u064B \u0645\u0646\u0643 \u064A\u0627 \u0637\u064A\u0628\u060C \u062E\u0648\u0627\u062F\u0645 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0645\u0636\u063A\u0648\u0637\u0629 \u062C\u062F\u0627\u064B \u062D\u0627\u0644\u064A\u0627\u064B (\u062A\u0646\u0628\u064A\u0647 503 \u0645\u0624\u0642\u062A). 
      
      \u0644\u0643\u0646 \u0644\u0627 \u062A\u0642\u0644\u0642! \u064A\u0633\u0639\u062F\u0646\u064A \u062C\u062F\u0627\u064B \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u064A\u062F\u0648\u064A\u0627\u064B: \u064A\u0645\u0643\u0646\u0643 \u062A\u0635\u0641\u062D \u062F\u0644\u064A\u0644 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0628\u0627\u0644\u0623\u0633\u0641\u0644 \u0648\u062D\u062C\u0632 \u0641\u0646\u064A\u064A\u0646 \u0645\u0645\u062A\u0627\u0632\u064A\u0646 \u0641\u064A (\u0627\u0644\u0633\u0628\u0627\u0643\u0629\u060C \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621\u060C \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u060C \u0627\u0644\u0646\u0642\u0644\u060C \u0648\u063A\u064A\u0631\u0647\u0627). \u0648\u0644\u0623\u064A \u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0641\u0646\u064A \u0623\u0648 \u0639\u0637\u0644 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645\u060C \u062A\u0641\u0636\u0644 \u0628\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u062F\u0639\u0645\u0646\u0627 \u0627\u0644\u0641\u0646\u064A \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 777644. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u062E\u062F\u0645\u062A\u0643 \u0641\u064A \u062A\u0635\u0641\u062D \u0627\u0644\u0623\u0642\u0633\u0627\u0645\u061F`,
      offline: true,
      error: lastError ? lastError.message : "All AI models unavailable"
    });
  } catch (error) {
    console.error("General API Error in /api/assistant route:", error);
    res.json({
      text: "\u0639\u0630\u0631\u0627\u064B \u064A\u0627 \u0637\u064A\u0628\u060C \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u0646\u064A \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0631\u0633\u0627\u0644\u062A\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 777644.",
      offline: true
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static dist/...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
