import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { useCart } from '@/contexts/CartContext.helpers'
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
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
            <DialogPanel className="h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-lg font-semibold mb-4">
                  Your Cart
                </DialogTitle>
                <button onClick={onClose}>
                  <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-red-500" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            $ {item.price.toFixed(2)} x {item.quantity} ={' '}
                            <b>$ {(item.price * item.quantity).toFixed(2)}</b>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => decrementQuantity(item.id)}
                              className="p-1 bg-gray-200 border text-sm rounded hover:bg-gray-300"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="px-2 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => incrementQuantity(item.id)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                    <Link
                      to="/checkout"
                      className="mt-4 block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg font-medium"
                      onClick={onClose}
                    >
                      Checkout
                    </Link>
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
