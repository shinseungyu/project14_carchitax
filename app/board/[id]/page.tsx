import posts from '@/data/posts.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Post {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: string
  tags: string[]
}

const allPosts: Post[] = posts as Post[]

export function generateStaticParams() {
  return allPosts.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) return {}
  return {
    title: `${post.title} | 취등록세 계산기`,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: `/board/${post.id}` },
    openGraph: {
      title: `${post.title} | 취등록세 계산기`,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BoardPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    inLanguage: 'ko',
    author: { '@type': 'Organization', name: 'CarProTax' },
    publisher: { '@type': 'Organization', name: 'CarProTax' },
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/board" style={{ fontSize: '14px', color: '#f97316', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
        ← 목록으로
      </Link>

      <article>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', backgroundColor: '#fff7ed', color: '#f97316', padding: '3px 10px', borderRadius: '999px', fontWeight: '600' }}>
            {post.category}
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: '1.4', marginBottom: '12px' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888', marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
          <span>📅 {post.date}</span>
          <span>🏷️ {post.tags.join(', ')}</span>
        </div>

        <div style={{ lineHeight: '1.9', fontSize: '15px', color: '#444' }}>
          {post.content.split('\n').map((line, i) => (
            line.trim() === ''
              ? <br key={i} />
              : <p key={i} style={{ margin: '0 0 8px 0' }}>{line}</p>
          ))}
        </div>
      </article>

      <section style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>다른 글 보기</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allPosts.filter(p => p.id !== post.id).slice(0, 6).map(p => (
            <Link key={p.id} href={`/board/${p.id}`} style={{ textDecoration: 'none', padding: '12px 16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #eee', display: 'block' }}>
              <span style={{ fontSize: '12px', color: '#f97316', fontWeight: '600' }}>{p.category}</span>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#333', fontWeight: '500' }}>{p.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
