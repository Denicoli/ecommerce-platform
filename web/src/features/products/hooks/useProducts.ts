import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api'

export function useProducts() {
  const five_minutes = 1000 * 60 * 5
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: five_minutes
  })
}
