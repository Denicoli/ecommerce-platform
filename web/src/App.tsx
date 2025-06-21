import { Route, Routes, useLocation } from 'react-router-dom'
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
import { RequireAuth } from './components/RequireAuth'
import { Register } from './pages/Register'

function App() {
  const [isCartOpen, setCartOpen] = useState(false)
  const queryClient = useQueryClient()
  const location = useLocation()
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: () => fetchProducts
    })
  }, [queryClient])

  return (
    <AuthProvider>
      <CartProvider>
        {!hideHeader && <Header onCartClick={() => setCartOpen(true)} />}
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
        ></CartModal>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
