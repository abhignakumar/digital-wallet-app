import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db";

export async function GET(req: NextRequest) {
  const userId = Number(req.nextUrl.searchParams.get("userId"));
  try {
    const onRampTxns = await prisma.onRampTransaction.findMany({
      where: {
        userId: userId,
      },
    });
    if (!onRampTxns.length)
      return NextResponse.json({
        message: "OnRampTransactions not found (or) not present.",
      });
    else
      return NextResponse.json({
        message: "OnRampTransactions Retrieved.",
        transactions: onRampTxns.map((t) => ({
          amount: t.amount,
          status: t.status,
          time: t.startTime,
        })),
      });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error." });
  }
}
