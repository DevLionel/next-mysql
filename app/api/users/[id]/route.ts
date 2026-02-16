import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string}> }) {
  try { 
    const { id } = await context.params;

    const userId = Number(id);

    const body: { username: string; email: string } = await req.json();
    
    const { username, email } = body; 

    const result = await prisma.user.update({ 
      where: { id : userId},
      data : { username: username, email: email }
    });

    return NextResponse.json({ result, success: true }, { status: 200 });
  } 
  catch (error) {
  
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
    
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string}> }) {

    const { id } = await context.params;

    const userId = Number(id);

    const body: { username: string; email: string } = await req.json();
        
    const { username, email } = body;     
    
    if(isNaN(userId))
    {
        return NextResponse.json(
            { message: "Invalid ID", id },
            { status: 400 }
            );
    }
        
    const user = await prisma.user.delete({
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
