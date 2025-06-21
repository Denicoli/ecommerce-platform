import type { CartItem } from '@/contexts/CartContext.helpers'
import { api } from '@/services/api'

export async function createOrder(items: CartItem[]) {
  const response = await api.post('/orders', {
    products: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))
  })
}
