import { prisma } from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, username } = await request.json();

    // Validate input
    if (!email || !username) {
        return NextResponse.json({ error: "Email and username are required" }, { status: 400 });
    }

    try {
        // Find user by email
        const author = await prisma.user.findUnique({
            where: { 
                email: email,
                username: username,
                isAuthor: true, // Ensure the user is an author
            },
        })

        if (!author) {
            return NextResponse.json({ error: "Author not found" }, { status: 404 });
        }

        return NextResponse.json({
            author: author,
            message: "Author found successfully"
        }, { status: 200 })
    } catch (error) {
        console.error("Error finding author:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}