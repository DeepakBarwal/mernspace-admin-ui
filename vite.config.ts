import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { UserConfig } from "vite";
import { InlineConfig } from "vitest/node";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
    globals: true,
  },
} as VitestConfigExport);
