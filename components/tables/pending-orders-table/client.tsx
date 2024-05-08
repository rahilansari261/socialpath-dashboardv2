"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/constants/data";

import { columns } from "./columns";
import React, { useEffect } from "react";
import axios from "axios";
import { formatBeautifulDate } from "@/lib/utils";
import { fetchData } from "next-auth/client/_utils";

interface ProductsClientProps {
  data: Order[];
}

export const PendingOrdersTable = () => {
  const [data, setData] = React.useState<Order[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/orders");
        console.log(response.data);

        const data = response.data.orders.map((order: Order) => ({
          ...order,
          created_at: formatBeautifulDate(order.created_at),
        }));

        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Optionally handle the error by setting state or alerting the user
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Pending Orders (${data.length})`}
          description="Manage pending orders "
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
