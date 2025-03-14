
import React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { ChartData } from "@/types";

interface PieChartProps {
  data: ChartData[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(204 63% 60%)",
  "hsl(204 63% 30%)",
  "hsl(29 90% 70%)",
  "hsl(29 90% 40%)",
];

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          innerRadius="50%"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }}
          itemStyle={{
            color: "hsl(var(--foreground))",
          }}
          formatter={(value: number) => [`${value}%`, ""]}
          labelFormatter={(name) => name}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
