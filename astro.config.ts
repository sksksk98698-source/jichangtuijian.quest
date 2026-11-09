import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site";

// Centralized configuration powering canonical URLs, sitemaps and metadata
export default defineConfig({
  site: SITE.url,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        const url = item.url;
        const now = new Date();

        if (url === `${SITE.url}/` || url === SITE.url) {
          item.changefreq = "daily";
          item.priority = 1.0;
          item.lastmod = now;
        } else if (
          url.endsWith("/recommend/") ||
          url.endsWith("/guide/") ||
          url.endsWith("/free-nodes/") ||
          url.endsWith("/faq/") ||
          url.endsWith("/risk-warning/") ||
          url.endsWith("/free-trial/") ||
          url.endsWith("/clients/") ||
          url.endsWith("/brand/")
        ) {
          // 核心支柱聚合页
          item.changefreq = "daily";
          item.priority = 0.9;
          item.lastmod = now;
        } else if (url.includes("/brand/")) {
          // 42 家品牌专著级详情页
          item.changefreq = "weekly";
          item.priority = 0.8;
          item.lastmod = now;
        } else if (url.includes("/legal-notice/") || url.includes("/privacy-policy/")) {
          // 法律条款与隐私页
          item.changefreq = "monthly";
          item.priority = 0.3;
        } else {
          item.changefreq = "weekly";
          item.priority = 0.7;
          item.lastmod = now;
        }

        return item;
      },
    }),
  ],
});
