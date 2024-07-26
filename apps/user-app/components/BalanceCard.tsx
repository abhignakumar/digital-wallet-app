import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Unlocked Balance</div>
        <div>{displayAmount(amount)} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Locked Balance</div>
        <div>{displayAmount(locked)} INR</div>
      </div>
      <div className="flex justify-between pt-2 font-medium">
        <div>Total Balance</div>
        <div>{displayAmount(amount + locked)} INR</div>
      </div>
    </Card>
  );
};

export function displayAmount(amount: number): string {
  if (amount >= 100)
    return (
      amount.toString().slice(0, amount.toString().length - 2) +
      "." +
      amount
        .toString()
        .slice(amount.toString().length - 2, amount.toString().length)
    );
  else if (amount > 0 && amount < 100)
    return "0." + (amount < 10 ? "0" : "") + amount.toString();
  else return "0.00";
}
