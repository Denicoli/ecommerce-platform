import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext.helpers'
import { useEffect, useState } from 'react'

export function Header({ onCartClick }: { onCartClick: () => void }) {
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(location.search)
      if (searchTerm) {
        params.set('search', searchTerm.trim())
      } else {
        params.delete('search')
      }
      navigate({ pathname: '/', search: params.toString() }, { replace: true })
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchTerm])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Ecommerce
        </Link>
        <div className="flex items-center gap-4 relative">
          <button onClick={onCartClick} className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          <Link to="/login">
            <UserIcon className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
          </Link>
        </div>

        <div className="relative w-full max-w-lg">
          <MagnifyingGlassIcon className="absolute left-4 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all tex-sm md:text-base"
            aria-label="Search products"
          />
        </div>
      </div>
    </header>
  )
}
