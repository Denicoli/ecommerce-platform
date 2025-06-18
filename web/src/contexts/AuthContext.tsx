import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

interface AuthContextProps {
  user: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const navigate = useNavigate()

  async function login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password })
    const { token } = response.data

    localStorage.setItem('token', token)
    setUser(email)
    navigate('/')
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
