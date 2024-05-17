"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import BreadCrumb from "./breadcrumb";
import { PricingPlanForm } from "./forms/pricing-plan-form";
import { Plan } from "@prisma/client";

const GetPricingPlan = ({ id }: { id: string }) => {
  const [planData, setplanData] = useState<Plan>();
  const breadcrumbItems = [
    { title: "Pricing Plan", link: "/dashboard/pricing-plan" },
    { title: "Update", link: "/" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/pricing-plan/${id}`);

        setplanData(response.data.plan);
      } catch {}
    };
    fetchData();
  }, [id]);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <PricingPlanForm initialData={planData} key={null} />
      </div>
    </ScrollArea>
  );
};

export default GetPricingPlan;
