import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import chatHandler from "./api/chat.js";

const localChatApi = (): Plugin => ({
  name: "local-chat-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (request, response) => {
      if (request.method !== "POST") {
        response.statusCode = 405;
        response.setHeader("Allow", "POST");
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ error: "Método não permitido." }));
        return;
      }

      try {
        const chunks: Buffer[] = [];
        for await (const chunk of request) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        const localRequest = Object.assign(request, { body });
        const localResponse = Object.assign(response, {
          status(code: number) {
            response.statusCode = code;
            return localResponse;
          },
          json(payload: unknown) {
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify(payload));
          },
        });

        await chatHandler(localRequest, localResponse);
      } catch {
        if (!response.headersSent) {
          response.statusCode = 400;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
        }
        response.end(JSON.stringify({ error: "Requisição inválida." }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  process.env.GEMINI_MODEL = env.GEMINI_MODEL || process.env.GEMINI_MODEL;

  return ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    cssCodeSplit: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-core",
              test: /node_modules[\\/](?:react|react-dom|react-router|react-router-dom)[\\/]/,
            },
            {
              name: "motion-vendor",
              test: /node_modules[\\/]framer-motion[\\/]/,
            },
            {
              name: "helmet-vendor",
              test: /node_modules[\\/]react-helmet-async[\\/]/,
            },
            {
              name: "query-vendor",
              test: /node_modules[\\/]@tanstack[\\/]react-query[\\/]/,
            },
            {
              name: "forms-vendor",
              test: /node_modules[\\/](?:react-hook-form|zod|@hookform[\\/]resolvers)[\\/]/,
            },
            {
              name: "ui-vendor",
              test: /node_modules[\\/](?:@radix-ui[\\/](?:react-dialog|react-dropdown-menu|react-tabs|react-tooltip)|lucide-react)[\\/]/,
            },
          ],
        },
      },
    },
  },
  plugins: [react(), localChatApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  });
});
