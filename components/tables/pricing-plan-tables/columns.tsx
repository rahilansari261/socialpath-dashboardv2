"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Plan } from "@prisma/client";
import { CellAction } from "./cell-action";
// import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Plan>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "planName",
    header: "PLAN NAME",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },

  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: ({ cell }) => (
      <div style={{ maxWidth: "400px", height: "40px", overflow: "auto" }}>
        {cell.row.original.description}
      </div>
    ),
  },
  // {
  //   accessorKey: "features",
  //   header: "FEATURES",
  //   cell: ({ cell }) => (
  //     <div>
  //       {cell.row.original.features &&
  //         cell.row.original.features.map(
  //           (f: { feature: string }, index: number) => (
  //             <div
  //               style={{ maxWidth: "400px", height: "40px", overflow: "auto" }}
  //               key={index}
  //             >
  //               {feature}
  //             </div>
  //           )
  //         )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "created_at",
    header: "DATE",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
