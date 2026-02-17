import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE (req: NextRequest) {
    try {
        const body = await req.json();
        const { ids } = body;

        //Validate body
        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { message : "ids must be a non-empty array"},
                { status : 400}
            );
        }

        //Convert & validate integers
        const parseIds = ids.map((id: unknown) => {
            const parsed = Number(id);

            if (!Number.isInteger(parsed)) {
                throw new Error('Invalid id: ${id}');
            }
            
            return parsed;
        });

        //Delete users
        const result = await prisma.user.deleteMany({
            where: {
                id: {
                    in : parseIds,
                }, 
            },
        });

        return NextResponse.json(
            { 
                message : "Users deleted successfully",
                deletedCount: result.count
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Invalid request body or server error" },
            { status: 500 }
        );
    }
}
