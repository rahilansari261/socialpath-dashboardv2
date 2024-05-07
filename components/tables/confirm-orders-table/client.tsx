"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Order } from "@/constants/data";

interface ProductsClientProps {
  data: Order[];
}

export const ConfirmOrdersTable: React.FC<ProductsClientProps> = ({ data }) => {


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Confirm Orders (${data.length})`}
          description="Manage confirm orders "
        />
        
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
