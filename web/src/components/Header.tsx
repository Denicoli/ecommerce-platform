import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Ecommerce
        </Link>

        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
          </Link>
          <Link to="/login">
            <UserIcon className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
          </Link>
        </div>
      </div>
    </header>
  )
}
