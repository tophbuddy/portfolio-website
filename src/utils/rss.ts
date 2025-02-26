import { Feed } from 'feed';
import { BlogPost } from '../types/Blog';
import { siteConfig } from '../config/site';

/**
 * Generate RSS feed from blog posts
 * @param posts Array of blog posts to include in the feed
 * @returns RSS feed in various formats (RSS 2.0, Atom 1.0, JSON Feed 1.0)
 */
export function generateRSSFeed(posts: BlogPost[]) {
  const { title, description, siteUrl, author } = siteConfig;
  const feedUrl = `${siteUrl}/rss.xml`;
  const atomUrl = `${siteUrl}/atom.xml`;
  const jsonUrl = `${siteUrl}/feed.json`;

  const feed = new Feed({
    title,
    description,
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/images/og-image.jpg`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${author.name}`,
    updated: posts.length > 0 ? new Date(posts[0].publishedAt) : new Date(),
    feedLinks: {
      rss2: feedUrl,
      atom: atomUrl,
      json: jsonUrl,
    },
    author: {
      name: author.name,
      email: author.email,
      link: author.url,
    },
  });

  // Add posts to feed
  posts.forEach((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    const htmlContent = post.content
      .map((section) => {
        switch (section.type) {
          case 'heading':
            return `<h${section.level}>${section.content}</h${section.level}>`;
          case 'text':
            return `<p>${section.content}</p>`;
          case 'code':
            return `<pre><code class="language-${section.language}">${section.content}</code></pre>`;
          case 'quote':
            return `<blockquote>${section.content}${
              section.author ? `<cite>${section.author}</cite>` : ''
            }</blockquote>`;
          case 'list':
            const tag = section.ordered ? 'ol' : 'ul';
            return `<${tag}>${section.content
              .map((item) => `<li>${item}</li>`)
              .join('')}</${tag}>`;
          case 'image':
            return `<img src="${section.content}" alt="${section.alt}"${
              section.caption ? ` title="${section.caption}"` : ''
            } />`;
          default:
            return '';
        }
      })
      .join('\n');

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: htmlContent,
      author: [
        {
          name: post.author.name,
          link: author.url,
        },
      ],
      date: new Date(post.publishedAt),
      image: post.coverImage || undefined,
      category: post.tags.map((tag) => ({
        name: tag.name,
      })),
    });
  });

  return {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
}
