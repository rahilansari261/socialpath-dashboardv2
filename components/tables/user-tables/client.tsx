"use client";
// import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";

import React, { useEffect } from "react";
import { formatBeautifulDate } from "@/lib/utils";
import axios from "axios";
import { User } from "@prisma/client";

export const UserClient = () => {
  const [data, setData] = React.useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");

        const data = response.data.users.map((user: User) => ({
          ...user,
          created_at: formatBeautifulDate(user.created_at),
        }));

        setData(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
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
