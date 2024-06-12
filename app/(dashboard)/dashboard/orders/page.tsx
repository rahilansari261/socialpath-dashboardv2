import BreadCrumb from "@/components/breadcrumb";
import { ConfirmOrdersTable } from "@/components/tables/confirm-orders-table/client";



const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ConfirmOrdersTable  />
      </div>
    </>
  );
}
