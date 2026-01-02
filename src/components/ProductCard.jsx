'use client'

import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'

// Stagger animation for the product grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  },
}

export const ProductCard = ({ product }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-30 dark:to-gray-700" />

      <div className="relative z-10">
        <div className="mb-4 overflow-hidden rounded-lg">
          <motion.img
            src={product?.productImage}
            alt={product?.productName}
            className="h-80 w-full object-cover transition-transform duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-400">
          {product?.productName}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {product?.productDescription}
        </p>
      </div>
    </motion.div>
  )
}

export const ProductGrid = ({ products }) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (products?.length > 0) {
      animate(
        'div',
        { opacity: 1, y: 0 },
        { delay: stagger(0.1), duration: 0.5 },
      )
    }
  }, [products, animate])

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {products?.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-lg text-gray-600 dark:text-gray-300"
        >
          No products found. Try adjusting your search.
        </motion.p>
      ) : (
        <motion.div
          ref={scope}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
