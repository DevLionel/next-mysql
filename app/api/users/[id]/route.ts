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

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string}> }) {
        
    const { id } = await context.params;

    const userId = Number(id);

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
