"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// User type based on your Prisma schema
export interface User {
  id: string
  email: string
  username: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  isAuthor: boolean
  createdAt: string
  updatedAt: string
}

// Auth context type - Focused on core functionality
interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isAuthor: boolean
  login: (email: string, username: string) => Promise<boolean>
  signupReader: (email: string, username: string, displayName?: string) => Promise<boolean>
  signupAuthor: (email: string, username: string, displayName?: string) => Promise<boolean>
  logout: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Computed values
  const isAuthenticated = !!user
  const isAuthor = isAuthenticated && user?.isAuthor === true

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Check current authentication status
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      const userData = localStorage.getItem('user')
      
      if (!userData) {
        setIsLoading(false)
        return
      }

      // Parse stored user data
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('user')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Login function
  const login = async (email: string, username: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Set user data in state
        setUser(data.user)
        
        return true
      } else {
        const errorData = await response.json()
        console.error('Login failed:', errorData.error)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Reader signup function
  const signupReader = async (
    email: string, 
    username: string, 
    displayName?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/signup/reader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          username, 
          displayName,
          isAuthor: false // Reader signup
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Set user data in state
        setUser(data.user)
        
        return true
      } else {
        const errorData = await response.json()
        console.error('Reader signup failed:', errorData.error)
        return false
      }
    } catch (error) {
      console.error('Reader signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Author signup function
  const signupAuthor = async (
    email: string, 
    username: string, 
    displayName?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/signup/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          username, 
          displayName,
          isAuthor: true // Author signup
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Set user data in state
        setUser(data.user)
        
        return true
      } else {
        const errorData = await response.json()
        console.error('Author signup failed:', errorData.error)
        return false
      }
    } catch (error) {
      console.error('Author signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state
      localStorage.removeItem('user')
      setUser(null)
      setIsLoading(false)
      
      // Redirect to home page
      router.push('/')
    }
  }

  // Context value - Simplified to core functionality
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    isAuthor,
    login,
    signupReader,
    signupAuthor,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// HOC for protected routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}

// HOC for author-only routes
export const withAuthorAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthorProtectedComponent(props: P) {
    const { isAuthenticated, isAuthor, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login')
        } else if (!isAuthor) {
          router.push('/') // Redirect non-authors to home
        }
      }
    }, [isAuthenticated, isAuthor, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (!isAuthenticated || !isAuthor) {
      return null
    }

    return <Component {...props} />
  }
}