import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function ProductFilters() {
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || '')
  const [minPrice, setMinPrice] = useState(params.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') || '')
  // const [orderBy, setOrderBy] = useState(params.get('orderBy') || '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams(params)

      if (category) newParams.set('category', category)
      else newParams.delete('category')

      if (minPrice) newParams.set('minPrice', minPrice)
      else newParams.delete('minPrice')

      if (maxPrice) newParams.set('maxPrice', maxPrice)
      else newParams.delete('maxPrice')

      // if (orderBy) newParams.set('orderBy', orderBy)
      // else newParams.delete('orderBy')

      setParams(newParams, { replace: true })
    }, 300)

    return () => clearTimeout(timeout)
  }, [category, minPrice, maxPrice /* orderBy */])

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">All categories</option>
            <option value="Awesome">Awesome</option>
            <option value="Electronic">Electronic</option>
            <option value="Elegant">Elegant</option>
            <option value="Ergonomic">Ergonomic</option>
            <option value="Fantastic">Fantastic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* 
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Order by</option>
          <option value="price_asc">Price: Low - High </option>
          <option value="price_desc">Price: High - Low</option>
        </select> 
        */}
      </div>
    </div>
  )
}
