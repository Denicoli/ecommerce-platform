import { useProducts } from './hooks/useProducts'
import { ProductList } from './components/ProductList'

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useProducts()

  if (isLoading)
    return (
      <div className="text-center py-8 text-gray-500">Loading products...</div>
    )
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading products
      </div>
    )
  if (!products?.length)
    return (
      <div className="text-center py-8 text-gray-500">
        No products available
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Best Products</h1>
      <ProductList products={products} />
    </div>
  )
}
