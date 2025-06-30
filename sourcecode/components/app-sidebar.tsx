"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Bookmark,
  Vote,
  BookCopy
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"

// This is sample data.
const data = {
  company: [
    {
      name: "StoryWeaver",
      logo: BookCopy
    }
  ],
  navMyStories: [
    {
      title: "Following",
      url: "#",
      icon: Bookmark,
      isActive: true,
      items: [
        {
          title: "Story 1",
          url: "#",
        },
        {
          title: "Story 2",
          url: "#",
        },
        {
          title: "Story 3",
          url: "#",
        },
      ],
    },
    {
      title: "Vote Now",
      url: "#",
      icon: Vote,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

function StaticTeamDisplay({ team }: { team: typeof data.company[0] }) {
  const IconComponent = team.logo
  
  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <IconComponent className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{team.name}</span>
      </div>
    </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAuthor } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StaticTeamDisplay team={data.company[0]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMyStories} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {user ? 
        (<NavUser user={user}/>) :
        (<NavUser user={null} />)}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
