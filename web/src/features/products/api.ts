import { api } from '@/services/api'
import type { Product } from './types'

type FetchProductsParams = {
  name?: string
  category?: string
  minPrice?: string
  maxPrice?: string
}

export async function fetchProducts(
  params: FetchProductsParams = {}
): Promise<Product[]> {
  const response = await api.get('/products', { params })
  return response.data
}
