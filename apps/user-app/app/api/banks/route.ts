import prisma from "@repo/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const banks = await prisma.bankProvider.findMany({
      select: {
        name: true,
        paymentUrl: true,
      },
    });
    return NextResponse.json({ message: "All banks retrieved", banks });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error" });
  }
}
