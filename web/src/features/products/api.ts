import { api } from '@/services/api'
import type { Product } from './types'

export async function fetchProducts(search: string = ''): Promise<Product[]> {
  const response = await api.get('/products', {
    params: search ? { name: search } : {}
  })
  return response.data
}
