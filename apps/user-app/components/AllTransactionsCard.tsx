import { Card } from "@repo/ui/card";
import { $Enums } from "@repo/db";
import { P2PTxnItem } from "./P2PTxnItem";
import { OnRampTxnItem } from "./OnRampTxnItem";

export const AllTransactionCard = ({
  transactions,
}: {
  transactions?: {
    type: "OnRamp" | "P2P";
    amount: number;
    time: Date;
    transfer?: "Sent" | "Received";
    status?: $Enums.OnRampStatus;
  }[];
}) => {
  if (!transactions?.length)
    return (
      <Card title="Transactions">
        <div className="text-center py-3">No Transactions</div>
      </Card>
    );
  else
    return (
      <Card title="Transactions">
        <div className="pt-2">
          {transactions?.map((t, index) => {
            if (t.type === "P2P") {
              const txn = {
                amount: t.amount,
                time: t.time,
                transfer: t.transfer,
              };
              return (
                <div className="flex hover:bg-gray-100 px-2 rounded-lg">
                  <div className="flex items-center mr-3">
                    <div className="text-xs font-semibold bg-purple-200 rounded-lg px-2 py-1">
                      P2P
                    </div>
                  </div>
                  <P2PTxnItem txn={txn} />
                </div>
              );
            } else {
              const txn = {
                amount: t.amount,
                time: t.time,
                status: t.status,
              };
              return (
                <div className="flex  hover:bg-gray-100 px-2 rounded-lg">
                  <div className="flex items-center mr-3">
                    <div className="text-xs font-semibold bg-blue-200 rounded-lg px-2 py-1">
                      Bank
                    </div>
                  </div>
                  <OnRampTxnItem txn={txn} />
                </div>
              );
            }
          })}
        </div>
      </Card>
    );
};
