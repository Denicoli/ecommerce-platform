import { useCart } from '@/contexts/CartContext.helpers'
import type { Product } from '../types'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-gray-900 font-bold text-lg mb-4">
          $ {product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
