import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactionCard } from "../../../components/OnRampTransactionCard";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { getBalance, getOnRampTransactions } from "../../../lib/fetchData";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");
  const userId = Number(session.user.id);
  const balance = await getBalance(userId);
  const transactions = await getOnRampTransactions(userId);
  if (transactions.length > 5) transactions.splice(5);

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
