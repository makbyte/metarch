'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import LoadingSpinner from '@/components/LoadingSpinner'
import { PageIntro } from '@/components/PageIntro'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { uploadImageAction } from '../../../actions/upload'
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../../../lib/firebase'

const Dashboard = () => {
  const { loading, user } = useAuth()
  const router = useRouter()
  const [formSubmitLoader, setFormSubmitLoader] = useState(false)
  const productImageRef = useRef(null)
  const blogImageRef = useRef(null)

  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productImage: null,
    productCategory: '',
  })

  const [blogData, setBlogData] = useState({
    blogTitle: '',
    blogAuthor: '',
    blogDescription: '',
    blogImage: null,
  })

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [blogs, setBlogs] = useState([])

  const [categoryName, setCategoryName] = useState('')
  const [categoryLoader, setCategoryLoader] = useState(false)

  useEffect(() => {
    if (!user) return

    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setCategories(data)
    })

    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    if (!user) return

    const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setBlogs(data)
    })

    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    if (!user) return

    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProducts(data)
    })

    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <LoadingSpinner />
  }

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this category?',
    )
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'categories', categoryId))
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Failed to delete category')
    }
  }

  const handleDeleteBlog = async (blogId) => {
    const confirmDelete = confirm('Are you sure you want to delete this blog?')
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'blogs', blogId))
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Failed to delete blog')
    }
  }

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?',
    )
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'products', productId))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const handleProductInput = (e) => {
    const { name, value, files, type } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  const handleBlogInput = (e) => {
    const { name, value, files, type } = e.target
    setBlogData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  const handleCategoryInput = (e) => {
    setCategoryName(e.target.value)
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()

    if (!productData.productImage) {
      alert('Please upload a product image')
      return
    }

    if (!productData.productCategory) {
      alert('Please select a category')
      return
    }

    try {
      setFormSubmitLoader(true)
      const formData = new FormData()
      formData.append('file', productData.productImage)
      formData.append('type', 'products')
      formData.append('id', `${Date.now()}`)

      const res = await uploadImageAction(formData)
      if (res?.error) throw new Error(res.error)

      await addDoc(collection(db, 'products'), {
        productName: productData.productName,
        productDescription: productData.productDescription,
        productImage: res.url,
        createdAt: serverTimestamp(),
        productCategory: productData.productCategory,
      })

      setProductData({
        productName: '',
        productDescription: '',
        productImage: null,
        productCategory: '',
      })

      if (productImageRef.current) {
        productImageRef.current.value = ''
      }

      alert('Product uploaded successfully')
      setFormSubmitLoader(false)
    } catch (error) {
      console.error('Error uploading product:', error)
      alert(error.message || 'Something went wrong')
    }
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()

    if (!blogData.blogImage) {
      alert('Please upload a blog image')
      return
    }

    try {
      setFormSubmitLoader(true)
      const formData = new FormData()
      formData.append('file', blogData.blogImage)
      formData.append('type', 'blogs')
      formData.append('id', `${Date.now()}`)

      const res = await uploadImageAction(formData)
      if (res?.error) throw new Error(res.error)

      await addDoc(collection(db, 'blogs'), {
        blogTitle: blogData.blogTitle,
        blogAuthor: blogData.blogAuthor,
        blogDescription: blogData.blogDescription,
        blogImage: res.url,
        createdAt: serverTimestamp(),
      })

      setBlogData({
        blogTitle: '',
        blogAuthor: '',
        blogDescription: '',
        blogImage: null,
      })

      if (blogImageRef.current) {
        blogImageRef.current.value = ''
      }

      alert('Blog uploaded successfully')
      setFormSubmitLoader(false)
    } catch (error) {
      console.error('Error uploading blog:', error)
      alert(error.message || 'Something went wrong')
    }
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()

    if (!categoryName.trim()) {
      alert('Please enter category name')
      return
    }

    try {
      setCategoryLoader(true)

      await addDoc(collection(db, 'categories'), {
        name: categoryName,
        createdAt: serverTimestamp(),
      })

      setCategoryName('')
      alert('Category added successfully')
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Something went wrong')
    } finally {
      setCategoryLoader(false)
    }
  }

  return (
    <>
      <PageIntro
        eyebrow="Dashboard"
        title="Engineering smart solutions, together"
      />

      <Container>
        <form
          onSubmit={handleProductSubmit}
          className="mb-16 rounded-2xl bg-[var(--bg)] p-8"
        >
          <h2 className="mb-6 text-left font-display text-3xl font-semibold text-white">
            Add Product
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="productName"
                className="mb-2 block text-sm font-medium text-white"
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleProductInput}
                className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label
                htmlFor="productDescription"
                className="mb-2 block text-sm font-medium text-white"
              >
                Product Description
              </label>
              <textarea
                id="productDescription"
                type="text"
                name="productDescription"
                value={productData.productDescription}
                onChange={handleProductInput}
                className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter product description"
              />
            </div>

            <select
              name="productCategory"
              value={productData.productCategory}
              onChange={handleProductInput}
              className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white"
            >
              <option value="">Select category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Product Image
              </label>
              <input
                ref={productImageRef}
                type="file"
                name="productImage"
                accept="image/*"
                onChange={handleProductInput}
                className="block w-full rounded border border-neutral-700 bg-[var(--bgSoft)] px-4 py-2 text-white file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-1.5 file:text-sm file:font-semibold hover:file:bg-blue-700"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {formSubmitLoader ? 'Loading....' : 'Add Product'}
            </button>
          </div>
        </form>

        {/* Products List */}
        <div className="mb-16 rounded-2xl bg-[var(--bg)] p-8">
          <h3 className="mb-4 text-left font-display text-2xl font-semibold text-white">
            Products
          </h3>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-neutral-700">
            {products.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">
                No products added yet.
              </p>
            ) : (
              <ul className="divide-y divide-neutral-700">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-white">{product.productName}</span>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Category Form */}
        <form
          onSubmit={handleCategorySubmit}
          className="mb-16 rounded-2xl bg-[var(--bg)] p-8"
        >
          <h2 className="mb-6 text-left font-display text-3xl font-semibold text-white">
            Add Category
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="categoryName"
                className="mb-2 block text-sm font-medium text-white"
              >
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={handleCategoryInput}
                className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter category name"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {categoryLoader ? 'Loading...' : 'Add Category'}
            </button>
          </div>
        </form>

        {/* Category List */}
        <div className="mb-16 rounded-2xl bg-[var(--bg)] p-8">
          <h3 className="mb-4 text-left font-display text-2xl font-semibold text-white">
            Categories List
          </h3>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-neutral-700">
            {categories.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">
                No categories added yet.
              </p>
            ) : (
              <ul className="divide-y divide-neutral-700">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-white">{cat.name}</span>

                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Blog Form */}
        <form
          onSubmit={handleBlogSubmit}
          className="rounded-2xl bg-[var(--bg)] p-8"
        >
          <h2 className="mb-6 text-left font-display text-3xl font-semibold text-white">
            Add Blog
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="blogTitle"
                className="mb-2 block text-sm font-medium text-white"
              >
                Blog Title
              </label>
              <input
                id="blogTitle"
                type="text"
                name="blogTitle"
                value={blogData.blogTitle}
                onChange={handleBlogInput}
                className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label
                htmlFor="blogAuthor"
                className="mb-2 block text-sm font-medium text-white"
              >
                Author
              </label>
              <input
                id="blogAuthor"
                type="text"
                name="blogAuthor"
                value={blogData.blogAuthor}
                onChange={handleBlogInput}
                className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label
                htmlFor="blogDescription"
                className="mb-2 block text-sm font-medium text-white"
              >
                Blog Description
              </label>
              <textarea
                id="blogDescription"
                type="text"
                name="blogDescription"
                value={blogData.blogDescription}
                onChange={handleBlogInput}
                className="block w-full rounded-lg border border-neutral-700 bg-[var(--bgSoft)] p-3 text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter blog description"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Blog Image
              </label>
              <input
                ref={blogImageRef}
                type="file"
                name="blogImage"
                accept="image/*"
                onChange={handleBlogInput}
                className="block w-full rounded border border-neutral-700 bg-[var(--bgSoft)] px-4 py-2 text-white file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-1.5 file:text-sm file:font-semibold hover:file:bg-blue-700"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {formSubmitLoader ? 'Loading...' : 'Add Blog'}
            </button>
          </div>
        </form>

        {/* Blog List */}
        <div className="mt-8 rounded-2xl bg-[var(--bg)] p-8">
          <h3 className="mb-4 text-left font-display text-2xl font-semibold text-white">
            Blogs
          </h3>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-neutral-700">
            {blogs.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">No blogs added yet.</p>
            ) : (
              <ul className="divide-y divide-neutral-700">
                {blogs.map((blog) => (
                  <li
                    key={blog.id}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-white">{blog.blogTitle}</span>

                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Dashboard
