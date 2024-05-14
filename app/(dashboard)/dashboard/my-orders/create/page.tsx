import BreadCrumb from "@/components/breadcrumb";
import { OrderForm } from "@/components/forms/order-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const page = () => {
  const breadcrumbItems = [
    { title: "My Orders", link: "/dashboard/my-orders" },
    { title: "Create", link: "/dashboard/my-orders/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <OrderForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
};

export default page;
