import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import db from "../../utils/db";
import Post from '../../models/Post';
import Product from '../../models/Product';
import Feedback from '../../models/Feedback';
import Author from '../../models/Author';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔄 Auto-generating sitemap on request...');

    await db.connectDb();

    // ── Fetch từ DB ──────────────────────────────────────────
    const [posts, directPosts, products, feedbacks, authors] = await Promise.all([
      // Bài viết 3 cấp: /bai-viet/[slug] — isDirectPost != true
      Post.find({ isDraft: { $ne: true }, isDirectPost: { $ne: true } })
        .select('slug updatedAt createdAt').lean(),
      // Bài viết 2 cấp: /[slug] — isDirectPost = true
      Post.find({ isDraft: { $ne: true }, isDirectPost: true })
        .select('slug updatedAt createdAt').lean(),
      Product.find({}).select('slug updatedAt createdAt').lean(),
      Feedback.find({}).select('slug updatedAt createdAt').lean(),
      Author.find({}).select('slug updatedAt createdAt').lean(),
    ]);

    const baseUrl = 'https://dongphucunivi.com';
    const currentDate = new Date().toISOString();

    // ── Static routes ────────────────────────────────────────
    const staticRoutes = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/gioi-thieu', priority: '0.8', changefreq: 'weekly' },
      { url: '/san-pham', priority: '0.9', changefreq: 'daily' },
      { url: '/bai-viet', priority: '0.8', changefreq: 'daily' },
      { url: '/lien-he', priority: '0.7', changefreq: 'monthly' },
      { url: '/dang-nhap', priority: '0.3', changefreq: 'monthly' },
    ];

    // ── Product category routes ──────────────────────────────
    const productCategoryRoutes = [
      { url: '/san-pham/dong-phuc-gym', priority: '0.9', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-yoga-pilates', priority: '0.9', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-pickleball', priority: '0.9', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-ao-gio', priority: '0.8', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-ao-thun', priority: '0.7', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-chay-bo', priority: '0.7', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-golf-tennis', priority: '0.7', changefreq: 'weekly' },
      { url: '/san-pham/dong-phuc-mma', priority: '0.7', changefreq: 'weekly' },
    ];

    // ── Dynamic routes ────────────────────────────────────────
    // Bài viết 3 cấp: /bai-viet/[slug]
    const postRoutes = posts.map(post => ({
      url: `/bai-viet/${post.slug}`,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: post.updatedAt || post.createdAt,
    }));

    // Bài viết 2 cấp: /[slug] — isDirectPost = true
    const directPostRoutes = directPosts.map(post => ({
      url: `/${post.slug}`,
      priority: '0.8',           // priority cao hơn vì là landing page chuyên dụng
      changefreq: 'weekly',
      lastmod: post.updatedAt || post.createdAt,
    }));

    // Sản phẩm đơn lẻ
    const productRoutes = products.map(product => ({
      url: `/san-pham/${product.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: product.updatedAt || product.createdAt,
    }));

    // Feedback
    const feedbackRoutes = feedbacks.map(feedback => ({
      url: `/feedback/${feedback.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: feedback.updatedAt || feedback.createdAt,
    }));

    // Tác giả
    const authorRoutes = authors.map(author => ({
      url: `/tac-gia/${author.slug}`,
      priority: '0.6',
      changefreq: 'weekly',
      lastmod: author.updatedAt || author.createdAt,
    }));

    // ── Build XML ─────────────────────────────────────────────
    const buildUrl = ({ url, priority, changefreq, lastmod }) => {
      const lastmodStr = lastmod
        ? new Date(lastmod).toISOString()
        : currentDate;
      return `\n<url><loc>${baseUrl}${url}</loc><lastmod>${lastmodStr}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    };

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

    staticRoutes.forEach(r => { sitemapXml += buildUrl({ ...r, lastmod: null }); });
    productCategoryRoutes.forEach(r => { sitemapXml += buildUrl({ ...r, lastmod: null }); });
    postRoutes.forEach(r => { sitemapXml += buildUrl(r); });
    directPostRoutes.forEach(r => { sitemapXml += buildUrl(r); });   // ← thêm mới
    productRoutes.forEach(r => { sitemapXml += buildUrl(r); });
    feedbackRoutes.forEach(r => { sitemapXml += buildUrl(r); });
    authorRoutes.forEach(r => { sitemapXml += buildUrl(r); });

    sitemapXml += `\n</urlset>`;

    // ── Ghi sitemap.xml ───────────────────────────────────────
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml);

    // ── Ghi robots.txt với đầy đủ AI crawlers ────────────────
    const robotsContent = `# ============================================================
# robots.txt — dongphucunivi.com
# ============================================================

# Googlebot
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /search?

# Google AI Overview
User-agent: Google-Extended
Allow: /

# ChatGPT / OpenAI
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Perplexity AI
User-agent: PerplexityBot
Allow: /

# Anthropic Claude
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Meta AI
User-agent: FacebookBot
Allow: /

# Apple
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Microsoft Bing + Copilot
User-agent: Bingbot
Allow: /

User-agent: msnbot
Allow: /

# Default
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /search?

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml`;

    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent);

    // ── Response ──────────────────────────────────────────────
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const totalRoutes =
      staticRoutes.length +
      productCategoryRoutes.length +
      postRoutes.length +
      directPostRoutes.length +
      productRoutes.length +
      feedbackRoutes.length;

    console.log('✅ Sitemap generated successfully!');
    console.log(
      `📊 Stats: ${staticRoutes.length} static + ${productCategoryRoutes.length} categories + ${postRoutes.length} posts (/bai-viet) + ${directPostRoutes.length} direct posts (/) + ${productRoutes.length} products + ${feedbackRoutes.length} feedbacks = ${totalRoutes} total`
    );

    res.status(200).send(sitemapXml);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);

    // Fallback: trả về sitemap cũ nếu có
    try {
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        const existingSitemap = fs.readFileSync(sitemapPath, 'utf8');
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(existingSitemap);
        return;
      }
    } catch (fallbackError) {
      console.error('Fallback failed:', fallbackError);
    }

    res.status(500).json({
      success: false,
      message: 'Error generating sitemap',
      error: error.message,
    });
  }
}