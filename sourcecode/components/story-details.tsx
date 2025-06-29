"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function StoryDetails() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Title Section */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <h1 className="text-3xl font-bold text-muted-foreground">Title</h1>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Description */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-48 bg-muted rounded text-muted-foreground">
                Description
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Story Info */}
        <div className="space-y-4">
          {/* Author */}
          <Card>
            <CardContent className="p-4">
              <div className="text-muted-foreground">Author</div>
            </CardContent>
          </Card>

          {/* Genre */}
          <Card>
            <CardContent className="p-4">
              <div className="text-muted-foreground">Genre</div>
            </CardContent>
          </Card>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-muted-foreground text-sm">Total Chapters</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-muted-foreground text-sm">Total Readers</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Button size="lg" className="h-12">
          Read Now
        </Button>
        <Button size="lg" variant="outline" className="h-12">
          Follow
        </Button>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {/* Chapter 1 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-muted-foreground">Ch1: Title</div>
              <div className="text-muted-foreground text-sm">Published at: Date</div>
            </div>
          </CardContent>
        </Card>

        {/* Chapter 2 - Highlighted */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-muted-foreground">Ch2: Title</div>
              <div className="text-muted-foreground text-sm">Published at: Date</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}