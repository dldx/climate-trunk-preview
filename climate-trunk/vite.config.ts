import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ mode }) => {
  const isWidget = process.env.APP_MODE === "widget";

  if (isWidget) {
    return {
      plugins: [
        svelte(), // Use standard svelte plugin instead of sveltekit for the widget
        cssInjectedByJsPlugin(),
      ],
      build: {
        lib: {
          entry: "src/lib/widget-main.ts",
          name: "ClimateTrunk",
          fileName: "climate-trunk-widget",
          formats: ["iife"], // IIFE is best for direct script tag embedding
        },
        outDir: "dist-widget",
        emptyOutDir: true,
      },
    };
  }

  return {
    plugins: [sveltekit()],
  };
});
