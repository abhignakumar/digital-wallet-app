"use client";

import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactionCard } from "../../../components/OnRampTransactionCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { $Enums } from "@repo/db";
import axios from "axios";

export default function () {
  const session: any = useSession();
  const router = useRouter();
  const [balance, setBalance] = useState({ amount: 0, locked: 0 });
  const [transactions, setTransactions] = useState<
    [
      {
        amount: number;
        status: $Enums.OnRampStatus;
        time: Date;
      },
    ]
  >();

  useEffect(() => {
    async function fetchData() {
      const userId = session.data?.user.id;
      const balanceResponse = await axios.get(
        `http://localhost:3001/api/balance?userId=${userId}`
      );
      const onRampTxnsResponse = await axios.get(
        `http://localhost:3001/api/onRampTransactions?userId=${userId}`
      );
      setBalance(balanceResponse.data.balance);
      setTransactions(onRampTxnsResponse.data.transactions);
    }
    if (session.status === "authenticated") fetchData();
  }, [session]);

  if (session.status === "loading") return <div>Loading ...</div>;
  if (session.status === "unauthenticated") return router.push("/");

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] font-bold py-8">Transfer</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-5">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <div>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>
          <div className="pt-4">
            <OnRampTransactionCard transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
