import { Card } from "@repo/ui/card";
import { P2PTxnItem } from "./P2PTxnItem";

export const P2PTransactionCard = ({
  transactions,
}: {
  transactions?: {
    amount: number;
    time: Date;
    transfer: "Sent" | "Received";
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
          {transactions?.map((t, index) => <P2PTxnItem key={index} txn={t} />)}
        </div>
      </Card>
    );
};
