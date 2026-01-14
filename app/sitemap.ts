import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salesforceechoai.netlify.app'
  
  const routes = [
    '',
    '/services',
    '/pricing',
    '/about',
    '/blog',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes]
}

