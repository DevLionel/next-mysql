import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  try { 
    
    const body: { username: string; email: string } = await req.json();
    
    const { username, email } = body; 

    
    if (!username || !email) {
      return NextResponse.json({ error: "Username and email are required" }, { status: 400});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const newUser = await prisma.user.create({ 
      data : { username, email }, 
    });

    return NextResponse.json({ newUser, status: 201 });
  } 
  catch (error: any) {
    console.error(error);
    
    if (error.code === "P2002") { // Prisma unique constraint failed
        return NextResponse.json({ error: "Email already exists" }, { status : 409});
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
