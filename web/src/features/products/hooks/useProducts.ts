import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api'
import { useSearchParams } from 'react-router-dom'

export function useProducts() {
  const [params] = useSearchParams()

  const filters = {
    name: params.get('search') || '',
    category: params.get('category') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || ''
  }

  const five_minutes = 1000 * 60 * 5

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: five_minutes
  })
}
