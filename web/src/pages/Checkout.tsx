import { useCart } from '@/contexts/CartContext.helpers'
import { useNavigate } from 'react-router-dom'

export function Checkout() {
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  async function handleSubmit() {
    // const response = await fetch('/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    //   },
    //   body: JSON.stringify({ products: cartItems })
    // })
    // if (response.ok) {
    //   clearCart()
    //   navigate('/')
    //   alert('Order placed successfully!') //@TODO: Replace with proper notification
    // } else {
    //   alert('Failed to place order. Please try again later.') //@TODO: Replace with proper error handling
    // }
  }

  return (
    <div className="max-2-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>
            {item.name} ({item.quantity})
          </span>
          <span>$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="flex justify-between mt-6 font-semibold">
        <span>Total:</span>
        <span>$ {total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors"
      >
        Place Order
      </button>
    </div>
  )
}
