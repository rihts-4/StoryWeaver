"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// User type based on your Prisma schema
interface User {
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

// Auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, username: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
  refreshUser: () => Promise<void>
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

  // Check if user is authenticated
  const isAuthenticated = !!user

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

  // Login function - Updated to use your /api/userlogin endpoint
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

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true)
      
      // No server-side logout needed since you don't have tokens
      // Just clear local storage and state
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local state
      localStorage.removeItem('user')
      setUser(null)
      setIsLoading(false)
      
      // Redirect to home page
      router.push('/')
    }
  }

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      // Update localStorage as well
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  // Refresh user data from server
  const refreshUser = async () => {
    if (!user) return
    
    try {
      const response = await fetch('/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email, 
          username: user.username 
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  // Context value
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    refreshUser,
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

// Hook for author-only features
export const useAuthorAuth = () => {
  const { user, isAuthenticated } = useAuth()
  return {
    isAuthor: isAuthenticated && user?.isAuthor === true,
    user,
    isAuthenticated,
  }
}