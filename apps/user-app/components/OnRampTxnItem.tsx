import { $Enums } from "@repo/db";
import { displayAmount } from "./BalanceCard";

export const OnRampTxnItem = ({
  txn,
}: {
  txn: {
    amount: number;
    status: $Enums.OnRampStatus | undefined;
    time: Date;
  };
}) => {
  return (
    <div className="flex justify-between py-2 w-full">
      <div>
        <div className="text-sm flex justify-between pb-1">
          <div className="mr-3">Received INR</div>
          <div className="bg-slate-200 rounded-lg px-3">{txn.status}</div>
        </div>
        <div className="text-xs text-slate-600">
          {txn.time.toLocaleString()}
        </div>
      </div>
      <div className="flex items-center text-green-700 font-medium">
        + {displayAmount(txn.amount)} INR
      </div>
    </div>
  );
};
