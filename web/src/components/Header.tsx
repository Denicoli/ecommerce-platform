import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { logout } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
      <h1 className="text-lg font-bold">E-commerce</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </header>
  )
}
