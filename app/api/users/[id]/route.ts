import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string}}){
    console.log("params", params)
    const id = Number(params.id);
    console.log("id", id);
    if(isNaN(id))
    {
      return NextResponse.json(
      { message: "Invalid ID", id },
      { status: 400 }
    );
    }

    const user = await prisma.user.findUnique({
        where : { id }
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
