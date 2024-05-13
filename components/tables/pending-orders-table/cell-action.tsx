"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@prisma/client";


import axios from "axios";

import { CircleCheck, CircleX, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface CellActionProps {
  data: Order;
  fetchData?: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, fetchData }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onConfirm = async () => {
    try {
      setOpen(false);
      await axios(`/api/orders/${data.id}`, {
        method: "PUT",
        data: {
          status: title === "Accept" ? "accepted" : "rejected",
        },
      });
      toast({
        title: "Order updated",
        description: "Order has been updated successfully.",
        variant: "default",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title={title}
        description={description}
        continueVariant={title === "Accept" ? "default" : "destructive"}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
              setTitle("Accept");
              setDescription("Are you sure you want to accept this order?");
            }}
          >
            <CircleCheck className="mr-2 h-4 w-4" /> Accept
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
              setTitle("Reject");
              setDescription("Are you sure you want to reject this order?");
            }}
          >
            <CircleX className="mr-2 h-4 w-4" /> Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
