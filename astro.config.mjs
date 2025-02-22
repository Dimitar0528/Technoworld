import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import compress from "astro-compress";
import tunnel from "astro-tunnel";
import pageInsight from "astro-page-insight";
export default defineConfig({
  base: '/',
  adapter: node({
    mode: "middleware"
  }),
  output: 'server',
  site: 'https://technoworld-pviq.onrender.com',
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  experimental: {
    directRenderScript: true,
    clientPrerender: true,
    security: {
      csrfProtection: {
        origin: true,
      },
    },
  },
  integrations: [compress({
    CSS: false
  }), tunnel(), pageInsight()]
});