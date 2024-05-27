"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";

import { Plan } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  price: z.number(),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  initialData: any | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
  const defaultValues = initialData
    ? initialData
    : {
        planName: "",
        price: 0,
      };

  const { toast } = useToast();
  const [, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const title = initialData ? "Edit product" : "Create an order";
  const description = initialData ? "Edit a product." : "Add a new order.";
  // const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const { data: sesData } = useSession();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (data2: OrderFormValues) => {
    try {
      setLoading(true);
      const plan = plans.find((plan) => plan.id === data2.planName);

      const data = { planId: plan?.monthlyPlanId, userId: sesData?.user.id };
      const response = await fetch(`/api/subscriptions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        subscription_id: res.response.id,
        name: "SocialPath",
        description: plan?.description,

        handler: async function (response: any) {
          // const res = await axios("/api/orders/create-order", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   data: JSON.stringify({
          //     name: sesData?.user.name,
          //     pricing_plan: plan?.planName,
          //     userId: sesData?.user.id,
          //     razorpay_payment_id: response.razorpay_payment_id,
          //     razorpay_order_id: response.razorpay_order_id,
          //   }),
          // });

          // if (res.status === 200) {
          //   toast({
          //     variant: "default",
          //     title: "Order placed.",
          //     description: "Your order is placed successfully.",
          //   });
          // }
          alert(response.razorpay_payment_id),
            alert(response.razorpay_subscription_id),
            alert(response.razorpay_signature);
        },
        prefill: {
          name: sesData?.user.name,
          email: sesData?.user.email,
          contact: sesData?.user.phone,
        },
        notes: {
          address: "note value",
        },
        theme: {
          color: "#22bb37",
        },
      };

      // var options = {
      //   key: process.env.RAZORPAY_KEY_ID,
      //   subscription_id: "sub_OBzE8JUQfzPThS",
      //   name: "Acme Corp.",
      //   description: "Monthly Test Plan",
      //   // image: "/your_logo.jpg",
      //   callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      //   prefill: {
      //     name: "Gaurav Kumar",
      //     email: "gaurav.kumar@example.com",
      //     contact: "+919876543210",
      //   },
      //   notes: {
      //     note_key_1: "Tea. Earl Grey. Hot",
      //     note_key_2: "Make it so.",
      //   },
      //   theme: {
      //     color: "#F37254",
      //   },
      // };

      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your payment.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("/api/pricing-plan")
      .then((res) => {
        setPlans(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="planName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a pricing plan." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.planName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
