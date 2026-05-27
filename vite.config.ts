import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

const isNetlify = !!process.env.NETLIFY;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ...(isNetlify ? { plugins: [netlify()] } : {}),
});
