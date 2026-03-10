import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiResponse } from "next";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string}> }) {
        
    const { id } = await context.params;

    const userId = Number(id);

    if(isNaN(userId))
    {
      return NextResponse.json(
        { message: "Invalid ID", id },
        { status: 400 }
        );
    }
    
    const user = await prisma.user.findUnique({
        where : { id : userId }
    })

    if(!user)
    {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        )    
    }
 
    return NextResponse.json({ user, success: true }, { status: 200 });
}

export async function PUT(req: NextRequest, res: NextApiResponse, context: { params: Promise<{ id: string}> }) {
  try { 
    const { id } = await context.params;

    const userId = Number(id);

    const body: { username: string; email: string } = await req.json();
    
    const { username, email } = body; 

    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    // Optional: Regex email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const result = await prisma.user.update({ 
      where: { id : userId},
      data : { username: username, email: email }
    });

    return NextResponse.json({ result }, { status: 200 });
  } 
  catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
        return res.status(409).json({ error: "Email already exists" });
      }

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid ID", id }, { status: 400 });
  }

  try {
    // Safe delete using deleteMany (won't throw if user doesn't exist)
    const deleted = await prisma.user.deleteMany({
      where: { id: userId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error", success: false }, { status: 500 });
  }
}

