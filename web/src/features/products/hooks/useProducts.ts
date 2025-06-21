import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api'

export function useProducts(search: string = '') {
  const five_minutes = 1000 * 60 * 5
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => fetchProducts(search),
    staleTime: five_minutes
  })
}
