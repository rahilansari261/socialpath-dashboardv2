"use client";
// import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Plan } from "@prisma/client";
import axios from "axios";
import { formatBeautifulDate } from "@/lib/utils";

export const PricingPlanTable = () => {
  const [data, setData] = React.useState<Plan[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/pricing-plan");

      const data = response.data.map((plan: Plan) => ({
        ...plan,
        created_at: formatBeautifulDate(plan.created_at),
      }));

      setData(data);
    } catch (error) {
      // Optionally handle the error by setting state or alerting the user
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Pricing plan (${data.length})`}
          description="Manage Princing plan"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/pricing-plan/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
