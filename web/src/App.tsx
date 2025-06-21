import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Login } from './pages/Login'
import { Checkout } from './pages/Checkout'
import ProductsPage from './features/products'
import { Header } from './components/Header'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchProducts } from './features/products/api'
import { CartProvider } from './contexts/CartContext'
import { CartModal } from './features/cart/components/CartModal'

function App() {
  const [isCartOpen, setCartOpen] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: () => fetchProducts
    })
  }, [queryClient])

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header onCartClick={() => setCartOpen(true)} />
          <main className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
          ></CartModal>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
