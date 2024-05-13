import BreadCrumb from "@/components/breadcrumb";
import { PricingPlanForm } from "@/components/forms/pricing-plan-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const page = () => {
  const breadcrumbItems = [
    { title: "Pricing Plan", link: "/dashboard/pricing-plan" },
    { title: "Create", link: "/dashboard/pricing-plan/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <PricingPlanForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
};

export default page;
