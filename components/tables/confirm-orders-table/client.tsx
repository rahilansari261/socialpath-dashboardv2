"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

import React, { useEffect } from "react";
import axios from "axios";
import { formatBeautifulDate } from "@/lib/utils";
import { Order } from "@prisma/client";

export const ConfirmOrdersTable = () => {
  const [data, setData] = React.useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/orders");

        const data = response.data.orders.map((order: Order) => ({
          ...order,
          created_at: formatBeautifulDate(order.created_at),
        }));

        setData(data);
      } catch (error) {
        // Optionally handle the error by setting state or alerting the user
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders "
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
