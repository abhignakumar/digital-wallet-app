import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db";

export async function GET(req: NextRequest) {
  const userId = Number(req.nextUrl.searchParams.get("userId"));
  try {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!balance)
      return NextResponse.json({ message: "Balance not found for this user." });
    else
      return NextResponse.json({
        message: "Balance Retrieved.",
        balance: { amount: balance.amount, locked: balance.locked },
      });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error." });
  }
}
