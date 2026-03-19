import { MetadataRoute } from 'next'
import postsData from '@/data/posts.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://carprotax.com'
  
  const postUrls = postsData.map(post => ({
    url: `${base}/board?id=${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/used-car`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/eco-car`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/discount-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/board`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...postUrls
  ]
}
