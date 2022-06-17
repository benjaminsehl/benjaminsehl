import { defineConfig } from "vite";
import hydrogen from "@shopify/hydrogen/plugin";
const { plugin: mdPlugin, Mode } = require("vite-plugin-markdown");

export default defineConfig({
  plugins: [hydrogen(), mdPlugin({ mode: [Mode.HTML, Mode.TOC, Mode.REACT] })],
});
