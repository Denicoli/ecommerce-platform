import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Login } from './pages/Login'
import ProductsPage from './features/products'
import { Header } from './components/Header'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { fetchProducts } from './features/products/api'
import { CartProvider } from './contexts/CartContext'

function App() {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: fetchProducts
    })
  }, [queryClient])

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
