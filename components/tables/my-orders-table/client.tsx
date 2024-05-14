"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

import React, { useEffect } from "react";
import axios from "axios";
import { formatBeautifulDate } from "@/lib/utils";
import { Order } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const MyOrdersTable = () => {
  // get session in client page

  const [data, setData] = React.useState<Order[]>([]);
  const { data: sesData } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sesData?.user?.id) {
          const response = await axios.get(`/api/orders/${sesData?.user?.id}`);

          const data = response.data.orders.map((order: Order) => ({
            ...order,
            created_at: formatBeautifulDate(order.created_at),
          }));
          setData(data);
        }
      } catch (error) {
        // Optionally handle the error by setting state or alerting the user
      }
    };

    fetchData();
  }, [sesData?.user?.id]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`My Orders (${data.length})`} description="" />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/my-orders/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
