import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

interface AuthContextProps {
  user: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser('user')
    }
  }, [])

  async function login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password })
    const { accessToken } = response.data

    localStorage.setItem('token', accessToken)
    setUser(email)
    navigate('/')
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      await api.post('/auth/register', { name, email, password })
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
