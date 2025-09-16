'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import MetarchLogo from '@/images/metarchLogo.png'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    getAllBlogs()
  }, [])

  return (
    <>
      <PageIntro eyebrow="Blog" title="Insights, Innovations & Industry Trends">
        <p>
          Welcome to the Metarch Blog—your go-to resource for the latest in
          vacuum forming technology, manufacturing trends, and expert tips.
          Whether you&apos;re a production manager, engineer, or business owner,
          our blog is here to help you stay ahead of the curve.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : blogs.length > 0 ? (
            blogs.map((article) => (
              <FadeIn key={article.id}>
                <article>
                  <Border className="pt-16">
                    <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                      <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                        <h2 className="font-display text-2xl font-semibold text-[var(--bg)]">
                          <Link href={`/blog/${article.id}`}>
                            {article.blogTitle}
                          </Link>
                        </h2>
                        <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute top-0 left-0 text-sm text-[var(--bg)] lg:static"></dd>
                          <dt className="sr-only">Author</dt>
                          <dd className="mt-6 flex gap-x-4">
                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                              <Image
                                alt="Metarch-Logo"
                                src={MetarchLogo}
                                width={90}
                                height={100}
                                className="object-contain"
                              />
                            </div>
                            <div className="text-sm text-[var(--bg)]">
                              <div className="font-semibold">
                                {article.blogAuthor}
                              </div>
                              <div>CEO</div>
                            </div>
                          </dd>
                        </dl>
                        <p className="mt-6 line-clamp-3 max-w-2xl text-base text-[var(--bgSofter)]">
                          {article.blogDescription}
                        </p>
                        <Link
                          href={`/blog/${article.id}`}
                          aria-label={`Read more: ${article.blogTitle}`}
                          className="mt-8 inline-flex rounded-full bg-[var(--bg)] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[var(--bgSofter)]"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </Border>
                </article>
              </FadeIn>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-[var(--bgSofter)]">
                🚫 No blogs found.
              </p>
            </div>
          )}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
