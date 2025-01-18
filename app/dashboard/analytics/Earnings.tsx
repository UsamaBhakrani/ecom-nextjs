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

    if (filter === "week") {
      return weekly;
    }
  }, [filter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Revenue: 0</CardTitle>
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
                  <div>
                    {props.payload?.map((item) => (
                      <div key={item.payload.date}>
                        <p>Revenue: ${item.value}</p>
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
