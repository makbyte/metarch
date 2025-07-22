'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import MetarchLogo from '@/images/metarchLogo.png'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Button } from '@/components/Button'
const SingleBlogPage = ({ params }) => {
  const { id } = params

  const [singleBlog, setSingleBlog] = useState(null)
  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const ref = doc(db, 'blogs', id)
        const snapshot = await getDoc(ref)
        const article = snapshot.exists()
          ? { id: snapshot.id, ...snapshot.data() }
          : null
        setSingleBlog(article)
      } catch (error) {
        console.log('Error', error)
      }
    }
    fetchSingleBlog()
  }, [id])
  if (!singleBlog) return <LoadingSpinner></LoadingSpinner>

  const { blogAuthor, blogTitle, blogDescription, blogImage, createdAt } =
    singleBlog

  const formattedDate = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toLocaleDateString()
    : 'Unknown Date'

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Button href="/blog" className="mt-8">
        Back
      </Button>
      <header className="mb-10">
        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            <Image
              src={MetarchLogo}
              width={30}
              height={30}
              alt={blogAuthor}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-[var(--bg)]">
              {blogAuthor}
            </div>
            <div className="text-xs text-[var(--bgSofter)]">
              {formattedDate}
            </div>
          </div>
        </div>
      </header>

      {blogImage && (
        <div className="mb-10">
          <img
            src={blogImage}
            alt={blogTitle}
            className="max-h-[700px] w-full rounded-xl object-cover"
          />
        </div>
      )}

      <section className="prose prose-lg dark:prose-invert max-w-none text-[var(--bgSofter)]">
        <h1 className="text-4xl font-bold text-[var(--bg)]">{blogTitle}</h1>
        <p className="mt-4 text-lg text-[var(--bgSofter)]">{blogDescription}</p>
      </section>
    </article>
  )
}

export default SingleBlogPage
