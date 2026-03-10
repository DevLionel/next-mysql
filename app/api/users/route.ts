import { NextRequest, NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";



export async function GET(req: NextRequest) {
  try {
    const result = await prisma.user.findMany();
  
    return NextResponse.json(result, { status: 200 });
  } 
  catch (error) {
      console.error(error);
  
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try { 
    
    const body: { username: string; email: string } = await req.json();
    
    const { username, email } = body; 

    
    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const newUser = await prisma.user.create({ 
      data : { username, email }, 
    });

    return NextResponse.json({ newUser, status: 201 });
  } 
  catch (error: any) {
    console.error(error);
    
    if (error.code === "P2002") { // Prisma unique constraint failed
        return res.status(409).json({ error: "Email already exists" });
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
