export interface Product {
  id: string
  name: string
  description: string
  category: string
  image: string
  price: number
  discount?: number
  material?: string
  department?: string
  gallery?: string[]
}
