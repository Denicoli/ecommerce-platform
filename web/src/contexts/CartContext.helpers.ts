import type { Product } from '@/features/products/types'
import { useContext, createContext } from 'react'

export interface CartItem extends Product {
  quantity: number
}

export interface CartContextProps {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
