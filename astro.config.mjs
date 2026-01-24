import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";
// 替换 Vercel 适配器为 Netlify
import netlify from "@astrojs/netlify";

const config ={
          "site": {
            "title": "奥特曼诗社",
            "base_url": "https://aoteman.org",
            "base_path": "/",
            "trailing_slash": false,
            "favicon": "/images/favicon.svg",
            "logo": "/images/logo.png",
            "logo_darkmode": "/images/logo-darkmode.png",
            "logo_width": "40",
            "logo_height": "40",
            "logo_text": "奥特曼诗社"
          },

          "settings": {
            "search": true,
            "sticky_header": true,
            "theme_switcher": true,
            "default_theme": "system",
            "pagination": 2,
            "summary_length": 200,
            "blog_folder": "blog"
          },

          "metadata": {
            "meta_author": "奥特曼诗社",
            "meta_image": "/images/screenshot.png",
            "meta_description": "奥特曼诗社，古诗词的数字桃源"
          }
        }


export default defineConfig({
  // Netlify 也支持 server output
  output: "server",
  adapter: netlify(),

  site: config.site.base_url,
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",

  image: {
    service: squooshImageService()
  },

  integrations: [
    react(),
    sitemap(),
    tailwind({ config: { applyBaseStyles: false } }),
    AutoImport({ imports: [] }),
    mdx(),
    icon({ include: { tabler: ["*"] } }),
    partytown({ config: { debug: true, forward: ["dataLayer.push"] } })
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }]
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    },
    extendDefaultPlugins: true
  }
});
