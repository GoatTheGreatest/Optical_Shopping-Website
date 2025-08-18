import React from "react";
import Cards from "@/components/Cards";
import Sale_Card from "@/components/Sale_Card";
import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Line_Chart from "@/components/Line_Chart";

export default function Home() {
  return (
    <div>
      <h1 className="text-green-700 text-3xl font-bold ml-3 mt-3">
        Welcome User 😉
      </h1>
      <div className="grid grid-cols-4 max-md:grid-cols-1 mt-5 max-md:mt-3">
        <Cards
          title="Total Orders"
          quantity="0"
          icon={<ShoppingCartOutlined />}
        />
        <Cards title="Total Sales" quantity="0" icon={<ShoppingOutlined />} />
        <Cards
          title="Total Customers"
          quantity="0"
          icon={<UserAddOutlined />}
        />
        <Cards
          title="Total Amount"
          quantity="0"
          icon={<DollarCircleOutlined />}
        />
      </div>
      <Line_Chart />
      <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1 mt-4 max-md:gap-2">
        <Sale_Card heading="Orders" num="1" />
        <Sale_Card heading="Sales" num="2" />
      </div>
    </div>
  );
}
