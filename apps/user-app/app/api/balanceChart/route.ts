import { NextRequest, NextResponse } from "next/server";
import { getAllTransactions, getBalance } from "../../../lib/fetchData";
import { $Enums } from "@repo/db";

export async function GET(req: NextRequest) {
  try {
    const userId = Number(req.nextUrl.searchParams.get("userId"));
    const transactions = await getAllTransactions(userId);
    let balance = (await getBalance(userId)).amount;
    const xAxis: number[] = [];
    const yAxis: number[] = [];
    const latestDate = transactions[0]?.time;
    const latestDateTxns: {
      type: "OnRamp" | "P2P";
      amount: number;
      time: Date;
      transfer?: "Sent" | "Received";
      status?: $Enums.OnRampStatus;
    }[] = [];
    transactions.forEach((txn) => {
      if (txn.time.toDateString() === latestDate?.toDateString())
        latestDateTxns.push(txn);
    });
    latestDateTxns.forEach((txn, index) => {
      xAxis.push(txn.time.getTime());
      if (index === 0) yAxis.push(balance / 100);
      else {
        if (latestDateTxns[index - 1]?.type === "OnRamp") {
          balance = balance - (latestDateTxns[index - 1]?.amount || 0);
          yAxis.push(balance / 100);
        } else {
          if (latestDateTxns[index - 1]?.transfer === "Received") {
            balance = balance - (latestDateTxns[index - 1]?.amount || 0);
            yAxis.push(balance / 100);
          } else {
            balance = balance + (latestDateTxns[index - 1]?.amount || 0);
            yAxis.push(balance / 100);
          }
        }
      }
    });
    xAxis.reverse();
    yAxis.reverse();
    return NextResponse.json({
      message: "Balance Chart Data Retrieved.",
      chartData: { xAxis, yAxis },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error." });
  }
}
