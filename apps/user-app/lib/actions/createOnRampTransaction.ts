"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function createOnRampTransaction(
  bankProviderId: number,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id)
    return { message: "Unauthenticated Request." };

  const token = (Math.random() * 10000).toString();
  try {
    await prisma.onRampTransaction.create({
      data: {
        token: token,
        status: "Processing",
        amount: amount,
        startTime: new Date(),
        bankProviderId: bankProviderId,
        userId: Number(session?.user?.id),
      },
    });
    return { message: "Created onRampTransaction." };
  } catch (e) {
    console.log(e);
    return { message: "Error." };
  }
}
