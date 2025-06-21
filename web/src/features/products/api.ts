import { api } from '@/services/api'
import type { Product } from './types'

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get('/products')
  return response.data
}
