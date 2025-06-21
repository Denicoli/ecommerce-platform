import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { useCart } from '@/contexts/CartContext.helpers'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart()

  const { user } = useAuth()
  const navigate = useNavigate()

  function handleCheckout() {
    if (!user) {
      onClose()
      navigate('/login')
      return
    }
    onClose()
    navigate('/checkout')
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
        </TransitionChild>
        <div className="fixed inset-0 flex justify-end">
          <TransitionChild
            as={Fragment}
            enter="transition-transform ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <DialogTitle className="text-xl font-semibold">
                  Your Cart
                </DialogTitle>
                <button onClick={onClose} aria-label="Close cart modal">
                  <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-500 text-center mt-16">
                  Your cart is empty.
                </p>
              ) : (
                <div className="flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-100 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              $ {item.price.toFixed(2)} x {item.quantity} ={' '}
                              <span className="font-semibold text-gray-800">
                                $ {(item.price * item.quantity).toFixed(2)}
                              </span>
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => decrementQuantity(item.id)}
                                className="rounded-full border border-gray-300 p-1 hover:bg-gray-100"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span className="px-2 text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => incrementQuantity(item.id)}
                                className="rounded-full border border-gray-300 p-1 hover:bg-gray-100"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto border-t pt-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                      type="button"
                      className="mt-4 block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg font-medium"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
