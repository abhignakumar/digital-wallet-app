"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function p2pTransfer(toPhoneNumber: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id)
    return { message: "Unauthenticated Request." };

  const fromUserId = Number(session.user.id);

  const toUser = await prisma.user.findFirst({
    where: {
      phoneNumber: toPhoneNumber,
    },
  });

  if (!toUser) return { message: "User not found." };
  console.log(session, toUser);

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${fromUserId} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: fromUserId,
        },
      });
      if (!fromBalance || fromBalance.amount < amount)
        throw new Error("Insufficient funds");
      await tx.balance.update({
        where: {
          userId: fromUserId,
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
      await tx.p2pTransfer.create({
        data: {
          amount: amount,
          timestamp: new Date(),
          fromUserId: fromUserId,
          toUserId: toUser.id,
        },
      });
    });
    return { message: "P2P Transfer done." };
  } catch (e) {
    console.log(e);
    return { message: "Error." };
  }
}
