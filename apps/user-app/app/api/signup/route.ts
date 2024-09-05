import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { phoneNumber, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        phoneNumber,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while create a account" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Account created" });
}
