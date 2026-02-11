import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // adjust path as needed

export async function GET() {
  try {
    const result = await prisma.user.findMany();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const data = {
      username: "lionel346",
      email: "lionelhuizing@gmail.com",
    };

    await prisma.user.create({ data });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
