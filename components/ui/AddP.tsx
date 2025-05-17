"use client";

import type React from "react";

import { CreateProduct } from "@/app/_lib/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Minus, Plus, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as z from "zod";
import { useRouter } from "next/navigation";

// Example categories - replace with your actual data source

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  oldPrice: z.coerce
    .number()
    .positive({
      message: "Old price must be a positive number.",
    })
    .optional(),
  discount: z.coerce
    .number()
    .min(0)
    .max(100, {
      message: "Discount must be between 0 and 100.",
    })
    .optional(),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, {
      message: "Rating must be between 0 and 5.",
    })
    .default(0), // Changed from optional to default(0)
  quantity: z.coerce.number().int().positive({
    message: "Quantity must be a positive integer.",
  }),
  imageUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  sizes: z.array(z.string()).default([]), // Changed from optional to default([])
  category: z.string().min(1, {
    message: "Please select or create a category.",
  }),
});

// Available sizes for the product
const availableSizes = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
];

export default function AddProductPage({}) {
  const [isSubmitting, setisSubmiting] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      oldPrice: undefined,
      discount: 0,
      rating: 0,
      quantity: 1,
      imageUrl: "",
      sizes: [],
      category: "",
    },
  });

  // Update form when selectedSizes changes
  useEffect(() => {
    form.setValue("sizes", selectedSizes);
  }, [selectedSizes, form]);

  const handleSizeChange = (sizeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes((prev) => [...prev, sizeId]);
    } else {
      setSelectedSizes((prev) => prev.filter((id) => id !== sizeId));
    }
  };

  // Calculate old price based on current price and discount
  const calculateOldPrice = (price: number, discount: number) => {
    if (!price || discount <= 0) return price;
    return +(price / (1 - discount / 100)).toFixed(2);
  };

  // Calculate discount based on price and old price
  const calculateDiscount = (price: number, oldPrice: number) => {
    if (!price || !oldPrice || oldPrice <= price) return 0;
    return +((1 - price / oldPrice) * 100).toFixed(2);
  };

  // Update values when price changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    const newPrice = Number.parseFloat(e.target.value);
    form.setValue("price", newPrice);

    const oldPrice = form.getValues("oldPrice");
    if (oldPrice && oldPrice > newPrice) {
      const newDiscount = calculateDiscount(newPrice, oldPrice);
      form.setValue("discount", newDiscount);
    }

    setIsUpdating(false);
  };

  // Update values when old price changes
  const handleOldPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    const newOldPrice = Number.parseFloat(e.target.value);
    form.setValue("oldPrice", newOldPrice);

    const price = form.getValues("price");
    if (newOldPrice > price) {
      const newDiscount = calculateDiscount(price, newOldPrice);
      form.setValue("discount", newDiscount);
    }

    setIsUpdating(false);
  };

  // Update values when discount changes
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    const newDiscount = Number.parseFloat(e.target.value);
    form.setValue("discount", newDiscount);

    const price = form.getValues("price");
    if (price && newDiscount > 0) {
      const newOldPrice = calculateOldPrice(price, newDiscount);
      form.setValue("oldPrice", newOldPrice);
    }

    setIsUpdating(false);
  };

  const router = useRouter();
  const Handlesubmit = async (e) => {
    e.preventDefault();
    setisSubmiting(true);
    const formValues = form.getValues();
    if (!formValues.name) {
      toast.error("Product name is required");
      setisSubmiting(false);
      return;
    }

    if (!formValues.imageUrl) {
      toast.error("Image url is required");
      setisSubmiting(false);
      return;
    }
    if (!formValues.price) {
      toast.error("Price is required");
      setisSubmiting(false);
      return;
    }
    if (!formValues.sizes) {
      toast.error("size is required");
      setisSubmiting(false);
      return;
    }
    if (!formValues.description) {
      toast.error("description is required");
      setisSubmiting(false);
      return;
    }
    try {
      const formData = new FormData(e.target);
      // Add sizes to FormData
      selectedSizes.forEach((size) => {
        formData.append("sizes", size);
      });

      await CreateProduct(formData, selectedSizes);
      toast.success("Product has been created successfully", {
        autoClose: 2000,
        onClose: () => {
          router.push("/dashboard/Product");
        },
      });
    } catch (error) {
      toast.error("Error creating product");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Add New Product</h1>
      </div>

      <Card className="border border-amber-50 shadow-md">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={Handlesubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {" "}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the product image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={handlePriceChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oldPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={handleOldPriceChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          {...field}
                          onChange={handleDiscountChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity in Stock</FormLabel>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const currentValue = field.value || 0;
                            if (currentValue > 1) {
                              field.onChange(currentValue - 1);
                            }
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <FormControl>
                          <Input
                            type="number"
                            className="text-center mx-2"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const currentValue = field.value || 0;
                            field.onChange(currentValue + 1);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rating Field - Now using a hidden input to ensure the value is submitted */}

              {/* Sizes Field - Now using hidden inputs to ensure values are submitted */}
              <div className="space-y-2">
                <FormLabel>Available Sizes</FormLabel>
                <FormDescription>
                  Select all sizes that are available for this product
                </FormDescription>

                {/* Hidden input for sizes array */}
                {selectedSizes.map((size, index) => (
                  <input key={index} type="hidden" name="sizes" value={size} />
                ))}

                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {availableSizes.map((size) => (
                    <div
                      key={size.id}
                      className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3"
                    >
                      <Checkbox
                        id={`size-${size.id}`}
                        checked={selectedSizes.includes(size.id)}
                        onCheckedChange={(checked) =>
                          handleSizeChange(size.id, checked === true)
                        }
                      />
                      <label
                        htmlFor={`size-${size.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {size.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your product description here..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Link href="/dashboard/products"></Link>
                <Button
                  className="hover:bg-slate-950 cursor-pointer bg-gray-300 rounded-md hover:text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <>Saving...</>
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Create Category Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white z-50">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category to the system.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
