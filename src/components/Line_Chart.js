"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Line_Chart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(String(currentYear));
  const [sales, setSales] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetch("/data/sales.json")
      .then((res) => res.json())
      .then((json) => {
        let dataForYear = Array.isArray(json[year]) ? json[year] : null;
        if (!dataForYear) {
          const firstYear = Object.keys(json)[0];
          dataForYear = Array.isArray(json[firstYear])
            ? json[firstYear]
            : MONTHS.map((m) => ({ month: m, sales: 0 }));
        }
        const normalized = MONTHS.map((m) => {
          const found = dataForYear.find(
            (d) => String(d.month) === m || String(d.name) === m
          ) || { sales: 0 };
          return { month: m, sales: Number(found.sales) || 0 };
        });

        if (mounted) setSales(normalized);
      })
      .catch((err) => {
        console.error("Failed to load sales.json", err);
        if (mounted) setSales(MONTHS.map((m) => ({ month: m, sales: 0 })));
      });

    return () => {
      mounted = false;
    };
  }, [year]);

  return (
    <motion.div
      className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 md:my-4 md:p-6 border border-gray-300 mx-2 md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-medium text-green-700 text-center md:text-left">
          Order Revenue
        </h2>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-24 text-sm border rounded px-2 py-1"
        />
      </div>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={sales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={40} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4b5563",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#0000FF"
              strokeWidth={3}
              dot={{ fill: "#0000FF", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Line_Chart;
