import { prisma } from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";
import Link from "next/link";

export async function POST(request: NextRequest) {
    const { email, username } = await request.json();

    // Validate input
    if (!email || !username) {
        return NextResponse.json({ error: "Email and username are required" }, { status: 400 });
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { 
                email: email,
                username: username
            },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            user: user,
            message: "User found successfully"
        }, { status: 200 })
    } catch (error) {
        console.error("Error finding user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}