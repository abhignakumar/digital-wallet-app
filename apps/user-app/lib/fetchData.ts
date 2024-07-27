import prisma, { $Enums } from "@repo/db";

export async function getBalance(userId: number) {
  const balance = await prisma.balance.findFirst({
    where: {
      userId: userId,
    },
  });
  return { amount: balance?.amount || 0, locked: balance?.locked || 0 };
}

export async function getOnRampTransactions(userId: number) {
  const onRampTxns = await prisma.onRampTransaction.findMany({
    where: {
      userId: userId,
    },
  });
  const transactions = onRampTxns.map((t) => ({
    amount: t.amount,
    status: t.status,
    time: t.startTime,
  }));
  transactions.sort((t1, t2) =>
    t1.time < t2.time ? 1 : t1.time > t2.time ? -1 : 0
  );
  return transactions;
}

export async function getP2PTransactions(userId: number) {
  const sentTxns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: userId,
    },
  });
  const receivedTxns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: userId,
    },
  });
  const transactions: {
    amount: number;
    time: Date;
    transfer: "Sent" | "Received";
  }[] = sentTxns.map((t) => ({
    amount: t.amount,
    time: t.timestamp,
    transfer: "Sent",
  }));
  const concatTransactions = transactions.concat(
    receivedTxns.map((t) => ({
      amount: t.amount,
      time: t.timestamp,
      transfer: "Received",
    }))
  );
  concatTransactions.sort((t1, t2) =>
    t1.time < t2.time ? 1 : t1.time > t2.time ? -1 : 0
  );
  return concatTransactions;
}

export async function getAllTransactions(userId: number) {
  const p2pTxns = await getP2PTransactions(userId);
  const onRampTxns = await getOnRampTransactions(userId);
  const transactions: {
    type: "OnRamp" | "P2P";
    amount: number;
    time: Date;
    transfer?: "Sent" | "Received";
    status?: $Enums.OnRampStatus;
  }[] = [];
  p2pTxns.forEach((t) => {
    transactions.push({
      type: "P2P",
      amount: t.amount,
      time: t.time,
      transfer: t.transfer,
    });
  });
  onRampTxns.forEach((t) => {
    transactions.push({
      type: "OnRamp",
      amount: t.amount,
      time: t.time,
      status: t.status,
    });
  });
  transactions.sort((t1, t2) =>
    t1.time < t2.time ? 1 : t1.time > t2.time ? -1 : 0
  );
  return transactions;
}
