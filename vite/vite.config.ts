import { defineConfig } from "vite";

import autoprefixer from "autoprefixer";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [nodePolyfills(), react()],
    css: {
        postcss: {
            plugins: [autoprefixer({})],
        },
    },
});
