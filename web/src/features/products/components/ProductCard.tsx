import { useCart } from '@/contexts/CartContext.helpers'
import type { Product } from '../types'
import { useState } from 'react'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 600)
  }

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
        added ? 'ring-2 ring-indigo-100 scale-[1.02]' : ''
      }`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-gray-900 text-lg font-semibold mb-1">
          {product.name}
        </h2>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-black font-bold text-lg mb-4">
          $ {product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          className={`mt-auto py-2 px-4 font-medium text-white rounded-lg transition-all duration-200 ${
            added
              ? 'bg-indigo-500/90 scale-105'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
