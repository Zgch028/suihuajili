import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

// 动态站点地图：覆盖首页 / 关于 / 搜索 / 系列 / 文章 / 读书笔记 / 作品工作室
// 带 lastmod / changefreq / priority，利于搜索引擎长尾收录与更新频率判断
export const GET: APIRoute = async () => {
  const series = await getCollection('series');
  const posts = await getCollection('posts');
  const reading = await getCollection('reading');
  const works = await getCollection('works');
  const now = new Date().toISOString().slice(0, 10);

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: now },
    { loc: '/about', priority: '0.8', changefreq: 'monthly', lastmod: now },
    { loc: '/reading', priority: '0.7', changefreq: 'monthly', lastmod: now },
    { loc: '/works', priority: '0.7', changefreq: 'monthly', lastmod: now },
    { loc: '/search', priority: '0.3', changefreq: 'yearly', lastmod: now },
  ];

  const seriesUrls = series.map((s) => ({
    loc: `/series/${s.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: now,
  }));

  const postUrls = posts.map((p) => {
    const d = (p.data as { date?: string | Date }).date;
    const lastmod = d
      ? d instanceof Date
        ? d.toISOString().slice(0, 10)
        : String(d).slice(0, 10)
      : now;
    return {
      loc: `/posts/${p.slug}`,
      priority: '0.6',
      changefreq: 'yearly',
      lastmod,
    };
  });

  const readingUrls = reading.map((n) => ({
    loc: `/reading/${n.slug}`,
    priority: '0.6',
    changefreq: 'yearly',
    lastmod: n.data.date.toISOString().slice(0, 10),
  }));

  const workUrls = works.map((w) => ({
    loc: `/works/${w.slug}`,
    priority: '0.6',
    changefreq: 'yearly',
    lastmod: w.data.date.toISOString().slice(0, 10),
  }));

  const all = [...staticPages, ...seriesUrls, ...postUrls, ...readingUrls, ...workUrls];

  const urls = all
    .map(
      (u) =>
        `  <url><loc>${SITE.url}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
