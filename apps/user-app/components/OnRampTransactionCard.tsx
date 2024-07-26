import { Card } from "@repo/ui/card";
import { displayAmount } from "./BalanceCard";
import { $Enums } from "@repo/db";

export const OnRampTransactionCard = ({
  transactions,
}: {
  transactions?: {
    amount: number;
    status: $Enums.OnRampStatus;
    time: Date;
  }[];
}) => {
  if (!transactions?.length)
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-3">No Recent Transactions</div>
      </Card>
    );
  else
    return (
      <Card title="Recent Transactions">
        <div className="pt-2">
          {transactions?.map((t, index) => (
            <div key={index} className="flex justify-between py-2">
              <div>
                <div className="text-sm">Received INR</div>
                <div className="text-xs text-slate-600">
                  {t.time.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center text-green-700 font-medium">
                + {displayAmount(t.amount)} INR
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
};
