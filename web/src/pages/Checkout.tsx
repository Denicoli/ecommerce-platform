import { useCart } from '@/contexts/CartContext.helpers'
import { createOrder } from '@/features/orders/api'
import { Link, useNavigate } from 'react-router-dom'

export function Checkout() {
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Your cart is empty
        </h1>
        <Link to="/" className="text-indigo-600 font-medium hover:underline">
          Back to store
        </Link>
      </div>
    )
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  async function handleSubmit() {
    try {
      await createOrder(cartItems)
      clearCart()
      navigate('/')
      alert('Order placed successfully!') //@TODO: replace with toast notification
    } catch (error) {
      alert('Failed to place order. Please try again later.') //@TODO: replace with toast notification
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="w-full flex justify-center mb-6">
        <Link to="/" className="text-3xl font-bold text-indigo-600">
          Ecommerce
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Summary</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-full object-cover rounded-lg"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {item.quantity}x{' '}
                <span className="font-medium">
                  $ {item.price.toFixed(2)} = ${' '}
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
          <span>Total:</span>
          <span>$ {total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
