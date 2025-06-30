"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const { signupReader } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const signUpData = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      displayName: formData.get('display') as string,
    }

    try {
      const success = await signupReader(
        signUpData.email,
        signUpData.username,
        signUpData.displayName
      )

      if (success) {
        router.replace('/') // Redirect on success
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Join the Story. Shape the Adventure.</CardTitle>
          <CardDescription>
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    name="username"
                    type="text" 
                    placeholder="your username will not be shared"
                    required 
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="display">Display Name</Label>
                  <Input 
                    id="display" 
                    name="display"
                    type="text" 
                    placeholder="your display name will be made public"
                    required 
                    disabled={isLoading}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function AuthorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const { signupAuthor } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const signUpData = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      displayName: formData.get('display') as string,
    }

    try {
      const success = await signupAuthor(
        signUpData.email,
        signUpData.username,
        signUpData.displayName
      )

      if (success) {
        router.replace('/') // Redirect on success
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Your Imagination. Their Choices. Endless Possibilities.</CardTitle>
          <CardDescription>
            Become an Author
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    name="username"
                    type="text" 
                    placeholder="your username will not be shared"
                    required 
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="display">Display Name</Label>
                  <Input 
                    id="display" 
                    name="display"
                    type="text" 
                    placeholder="your display name will be made public"
                    required 
                    disabled={isLoading}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}