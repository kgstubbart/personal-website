import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Base is "/" because the site is served from the kgstubbart.dev custom
// domain root via the CNAME file in /public, not a github.io subpath.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
