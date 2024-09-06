"use client";

import { useRouter } from "next/navigation";
import { BalanceCard } from "../../../components/BalanceCard";
import { LineChart } from "@mui/x-charts/LineChart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function () {
  const session: any = useSession();
  const router = useRouter();
  const [balance, setBalance] = useState<{ amount: number; locked: number }>({
    amount: 0,
    locked: 0,
  });
  const [xAxis, setXAxis] = useState<[number]>();
  const [yAxis, setYAxis] = useState<[number]>();

  useEffect(() => {
    const fetchData = async () => {
      if (session.data?.user?.id) {
        const response1 = await axios.get(
          `/api/balance?userId=${session.data?.user?.id}`
        );
        const responseBalance = response1.data.balance;
        if (responseBalance)
          setBalance({
            amount: responseBalance.amount,
            locked: responseBalance.locked,
          });
        const response2 = await axios.get(
          `/api/balanceChart?userId=${session.data?.user?.id}`
        );
        const responseChartData = response2.data.chartData;
        if (responseChartData) {
          setXAxis(responseChartData.xAxis);
          setYAxis(responseChartData.yAxis);
        }
      }
    };
    fetchData();
  }, [session]);

  if (session.status === "loading") return <div>Loading ...</div>;

  if (session.status === "unauthenticated") router.push("/");

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] font-bold py-8">Dashboard</div>
      <div className="pr-5">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
      <div className="text-2xl text-[#6a51a6] font-semibold py-8">
        Recent day's Balance Chart
      </div>
      <div className="pr-5">
        <LineChart
          xAxis={[{ scaleType: "time", data: xAxis || [], hideTooltip: true }]}
          series={[
            {
              data: yAxis || [],
            },
          ]}
          // width={500}
          height={300}
        />
      </div>
    </div>
  );
}
