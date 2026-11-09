import type { APIRoute } from "astro";
import { SITE } from "../config/site";

export const GET: APIRoute = () => {
  const robots = `# ==============================================================================
# ROBOTS.TXT — 机场baby (jichangtuijian.quest)
# 搜索引擎爬虫规范与抓取预算引导
# ==============================================================================

User-agent: *
Allow: /
Disallow: /_astro/

# Google 搜索引擎爬虫
User-agent: Googlebot
Allow: /
Disallow: /_astro/

# Bing 搜索引擎爬虫
User-agent: bingbot
Allow: /
Disallow: /_astro/

# 百度搜索资源平台爬虫
User-agent: Baiduspider
Allow: /
Disallow: /_astro/

# 神马搜索 / UC / 夸克浏览器爬虫
User-agent: yisouspider
Allow: /
Disallow: /_astro/

# 站点地图声明 (同时支持标准 sitemap.xml 与 sitemap-index.xml)
Sitemap: ${SITE.url}/sitemap.xml
Sitemap: ${SITE.url}/sitemap-index.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
