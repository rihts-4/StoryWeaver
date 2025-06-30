"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
  UserPlus,
  Signature,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User as UserType, useAuth } from "@/context/AuthContext" // ✅ Renamed import to avoid conflicts

export function NavUser({
  user,
}: {
  user: UserType | null // ✅ Fixed prop type
}) {
  const { isMobile } = useSidebar()
  const { logout } = useAuth() // ✅ Get logout function from context

  // If no user is logged in, show sign in/sign up buttons
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex flex-col gap-2 p-2">
            <Button asChild size="sm" className="w-full">
              <Link href="/auth/login">
                <User className="size-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/auth/signup">
                <UserPlus className="size-4 mr-2" />
                Sign Up
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full">
              <Link href="/auth/newauthor">
                <Signature className="size-4 mr-2" />
                Become an Author
              </Link>
            </Button>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  // ✅ Helper to get display name
  const displayName = user.displayName || user.username
  
  // If user is logged in, show user dropdown
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatarUrl} alt={displayName} /> {/* ✅ Fixed property names */}
                <AvatarFallback className="rounded-lg">
                  {displayName.charAt(0).toUpperCase()} {/* ✅ Fixed property names */}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span> {/* ✅ Fixed property names */}
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl} alt={displayName} /> {/* ✅ Fixed property names */}
                  <AvatarFallback className="rounded-lg">
                    {displayName.charAt(0).toUpperCase()} {/* ✅ Fixed property names */}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span> {/* ✅ Fixed property names */}
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <BadgeCheck />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-stories">
                  <Sparkles />
                  My Stories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <User />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/billing">
                  <CreditCard />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/notifications">
                  <Bell />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}> {/* ✅ Added logout functionality */}
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
