import { displayAmount } from "./BalanceCard";

export const P2PTxnItem = ({
  txn,
}: {
  txn: {
    amount: number;
    time: Date;
    transfer: "Sent" | "Received" | undefined;
  };
}) => {
  return (
    <div className="flex justify-between py-2 w-full">
      <div>
        <div className="text-sm flex justify-between pb-1">
          {txn.transfer === "Sent" ? "Sent INR" : "Received INR"}
        </div>
        <div className="text-xs text-slate-600">
          {txn.time.toLocaleString()}
        </div>
      </div>
      {txn.transfer === "Sent" ? (
        <div className="flex items-center text-red-700 font-medium">
          - {displayAmount(txn.amount)} INR
        </div>
      ) : (
        <div className="flex items-center text-green-700 font-medium">
          + {displayAmount(txn.amount)} INR
        </div>
      )}
    </div>
  );
};
