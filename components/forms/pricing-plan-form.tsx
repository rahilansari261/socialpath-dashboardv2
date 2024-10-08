"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Heading } from "../ui/heading";

// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";

import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { v4 as uuidv4 } from "uuid";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const featureSchema = z.object({
  id: z.string(),
  feature: z.string().min(1, "Feature cannot be empty"),
});

const formSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  monthlyPrice: z.coerce
    .number()
    .positive({ message: "Price must be greater than 0" }),
  monthlyDiscount: z.coerce
    .number()
    .positive({ message: "Price must be greater than 0" })
    .lte(90, "discount can nveer be grater than 90%"),

  yearlyPrice: z.coerce
    .number()
    .positive({ message: "Price must be greater than 0" }),
  yearlyDiscount: z.coerce
    .number()
    .positive({ message: "Price must be greater than 0" })
    .lte(90, "discount can nveer be grater than 90%"),

  yearlyPaddleProductId: z
    .string()
    .min(1, "Paddle Product Id (Yearly) is required"),
  monthlyPaddleProductId: z
    .string()
    .min(1, "Paddle Product Id (Monthly) is required"),

  description: z
    .string()
    .min(3, "Product description must be at least 3 characters"),
  features: z.array(featureSchema),
});

type PricingPlanFormValues = z.infer<typeof formSchema>;

interface PricingPlanFormProps {
  initialData: any | null;
}
type Feature = {
  id: string;
  feature: string;
};

export const PricingPlanForm: React.FC<PricingPlanFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Update Pricing Plan" : "Create Pricing Plan";
  const description = initialData
    ? "Update a pricing plan."
    : "Add a new pricing plan.";
  // const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";
  const defaultValues = initialData || {
    planName: "",
    description: "",
    features: [{ id: uuidv4(), feature: "" }],
    monthlyPrice: 0,
    monthlyDiscount: 0,
    monthlyPaddleProductId: "",
    yearlyPrice: 0,
    yearlyDiscount: 0,
    yearlyPaddleProductId: "",
  };

  const form = useForm<PricingPlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const addFeature = () => {
    append({ id: uuidv4(), feature: "" });
  };

  const removeFeature = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: PricingPlanFormValues) => {
    try {
      setLoading(true);
      const featuresWithoutId = data.features.map(({ id, ...rest }) => rest);
      const newData = {
        ...data,
        monthlyLastPrice:
          (data.monthlyPrice * (100 - data.monthlyDiscount)) / 100,
        yearlyLastPrice: (data.yearlyPrice * (100 - data.yearlyDiscount)) / 100,
        features: featuresWithoutId,
      };

      await axios("/api/pricing-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(newData),
      });

      // router.refresh();
      router.push(`/dashboard`);
      toast({
        variant: "default",
        title: " Pricing plan created.",
        description: " Pricing plan created successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

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
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price(Monthly)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount(Monthly)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearlyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price(Yearly)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearlyDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount(Yearly)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearlyPaddleProductId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paddle Product ID(Yearly)</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPaddleProductId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paddle Product ID(Monthly)</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              {/* <br /> */}
              <Label about="Features">Features</Label>
              {fields.map(({ id, feature }: Feature, index) => (
                <FormField
                  key={id} // Important: Use item.id for keys in lists
                  // control={form.control}
                  name={`features.${index}.feature`} // Updated to use indexed naming
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input type="text" disabled={loading} {...field} />
                          <Button
                            variant={"outline"}
                            size="icon"
                            onClick={() => removeFeature(index)} // Update to use index
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button variant={"outline"} onClick={addFeature}>
                <Plus className="h-4 w-4" /> Add Feature
              </Button>
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
