"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TotalOrders } from "@/lib/inferTypes";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { weeklyChart } from "./weeklyChart";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { monthlyChart } from "./monthlyChart";

const Earnings = ({ totalOrders }: { totalOrders: TotalOrders[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "week";

  const chartItems = totalOrders.map((order) => ({
    date: order.order.created_at!,
    revenue: order.order.total,
  }));

  const activeChart = useMemo(() => {
    const weekly = weeklyChart(chartItems);
    const monthly = monthlyChart(chartItems);

    if (filter === "week") {
      return weekly;
    }
    if (filter === "month") {
      return monthly;
    }
  }, [filter]);

  const activeTotal = useMemo(() => {
    if (filter === "month") {
      return monthlyChart(chartItems)
        .reduce((sum, item) => (sum + item.revenue) / 100, 0)
        .toFixed(2);
    }
    return weeklyChart(chartItems)
      .reduce((sum, item) => (sum + item.revenue) / 100, 0)
      .toFixed(2);
  }, [filter]);

  return (
    <Card className="flex-1 shrink-0 h-full">
      <CardHeader>
        <CardTitle>Your Revenue: ${activeTotal}</CardTitle>
        <CardDescription>Heree are your recent earnings</CardDescription>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "cursor-pointer",
              filter === "week" ? "bg-primary" : "bg-primary/25"
            )}
            onClick={() =>
              router.push("/dashboard/analytics/?filter=week", {
                scroll: false,
              })
            }
          >
            This Week
          </Badge>
          <Badge
            className={cn(
              "cursor-pointer",
              filter === "month" ? "bg-primary" : "bg-primary/25"
            )}
            onClick={() =>
              router.push("/dashboard/analytics/?filter=month", {
                scroll: false,
              })
            }
          >
            This Month
          </Badge>
        </div>
        <CardContent className="h-96">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={activeChart}>
              <Bar dataKey="revenue" className="fill-primary" />
              <Tooltip
                content={(props) => (
                  <div className="bg-white py-2 px-4 rounded-md shadow-lg">
                    {props.payload?.map((item) => (
                      <div key={item.payload.date}>
                        <p>Revenue: ${(item.value as number) / 100}</p>
                        <p>Date: {item.payload.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Earnings;
