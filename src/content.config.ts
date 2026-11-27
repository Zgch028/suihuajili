import { defineCollection, z } from 'astro:content';

// 内容集合 schema —— 设计稿里每页 frontmatter 的单一事实来源
// 系列页（series）与文章（posts）各自独立，文章通过 series 字段归属系列

const series = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),              // 系列名（页面 H1）
    eyebrow: z.string(),            // 系列页头小标签，如「SERIES · 宋文化」
    description: z.string(),        // 系列简介（同时用于 series 页头与 meta description 兜底）
    tag: z.string(),                // 卡片上的分类标签，如「宋文化 · 生活美学」
    seoTitle: z.string(),           // 本页 <title>
    seoDescription: z.string(),     // 本页 meta description
    seoKeywords: z.array(z.string()), // 本页 meta keywords
    order: z.number().default(99),  // 首页系列网格排序
    headerImage: z.string().optional(), // 系列页头部背景图（如 /series-bg/qingming-header.jpg）
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),          // 文章日期 YYYY-MM-DD
    series: z.string(),             // 对应 series 的 slug
    description: z.string(),        // 摘要（列表卡 + meta description 兜底）
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),   // 封面图（可选）
    video: z.string().optional(),   // 本地视频路径（如 /videos/xxx.mp4），视频号系列用
    volume: z.string().optional(),   // 年卷标识，如「公元969年卷」
    originUrl: z.string().url().optional(), // 公众号原文链接；填了文章页会自动渲染「原文链接：点击阅读」页脚
  }),
});

// 读书笔记：28 本 AI 辅助精读笔记，正文为独立 HTML，走 iframe 承载
const reading = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),              // 书名
    author: z.string(),             // 作者
    category: z.string(),           // 书架分区：古典文学 / 哲学思想 / 心理认知 / 社科历史 / 科学自然 / AI与未来
    date: z.coerce.date(),          // 笔记日期
    description: z.string(),        // 一句话介绍（列表卡 + meta）
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),   // 封面（可选，缺省用书脊卡片）
    edition: z.string().optional(), // 版本：OCD分格 / 认知框架 / 完整版
    htmlPath: z.string(),           // 原版 HTML 路径，如 /reading/hongloumeng/index.html
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

// 作品工作室：可交互的网页小品，详情页 iframe 内嵌 + 全屏
const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    demoPath: z.string(),           // 作品入口，如 /works/mingtang/index.html
    howto: z.string().optional(),   // 怎么玩：入口操作提示，详情页「怎么玩」一栏
    builtAt: z.string().optional(), // 完成时间的展示文本；不填则用 date
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { series, posts, reading, works };
