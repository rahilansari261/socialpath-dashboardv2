import BreadCrumb from "@/components/breadcrumb";

import { PricingPlanTable } from "@/components/tables/pricing-plan-tables/client";

import { ScrollArea } from "@/components/ui/scroll-area";

import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Pricing Plan", link: "/dashboard/pricing-plan" },
    { title: "Create", link: "/dashboard/pricing-plan/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <PricingPlanTable />
      </div>
    </ScrollArea>
  );
}
