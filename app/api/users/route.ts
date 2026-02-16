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

    const result = await prisma.user.create({ 
      data : { username, email }, 
      select : { id : true }
    });

    return NextResponse.json({ result, success: true }, { status: 201 });
  } 
  catch (error) {
  
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
