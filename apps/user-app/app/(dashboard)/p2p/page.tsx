import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { SendCard } from "../../../components/SendCard";
import { P2PTransactionCard } from "../../../components/P2PTransactionCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getBalance, getP2PTransactions } from "../../../lib/fetchData";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");
  const userId = Number(session.user.id);
  const balance = await getBalance(userId);
  const transactions = await getP2PTransactions(userId);

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] font-bold py-8">P2P Transfer</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-5">
        <div>
          <SendCard />
        </div>
        <div>
          <div>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>
          <div className="pt-4">
            <P2PTransactionCard transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
