import { prisma } from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, username, displayName, isAuthor } = await request.json();

    // Validate input
    if (!email || !username || !displayName) {
        return NextResponse.json({ error: "Email, username, and display name are required" }, { status: 400 });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: { 
                OR: [
                    { email: email },
                    { username: username }
                ]
            },
        })

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 }); // Changed to 409 Conflict
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                displayName: displayName,
                isAuthor: isAuthor ?? false, // Use provided value or default to false
            },
        })

        return NextResponse.json({
            user: newUser,
            message: "User created successfully"
        }, { status: 201 }) // Changed to 201 Created
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}