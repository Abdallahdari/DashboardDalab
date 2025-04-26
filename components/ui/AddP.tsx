"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Save, Star, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateProduct } from "@/app/_lib/action";
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

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

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
    },
  });

  // Update form when selectedSizes changes
  useEffect(() => {
    form.setValue("sizes", selectedSizes);
  }, [selectedSizes, form]);

  // Update form when ratingValue changes
  useEffect(() => {
    form.setValue("rating", ratingValue);
  }, [ratingValue, form]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const values = await form.trigger();
      if (!values) {
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData(e.currentTarget);

      // Add sizes and rating to form data
      selectedSizes.forEach((size) => {
        formData.append("sizes", size);
      });
      formData.set("rating", ratingValue.toString());

      // Submit the form using the CreateProduct action
      await CreateProduct(formData);

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle star rating click
  const handleRatingClick = (selectedRating: number) => {
    setRatingValue(selectedRating);
  };

  // Handle size checkbox change
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

  // Calculate price based on old price and discount
  const calculatePrice = (oldPrice: number, discount: number) => {
    if (!oldPrice || discount <= 0) return oldPrice;
    return +(oldPrice * (1 - discount / 100)).toFixed(2);
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

  return (
    <div className="space-y-6">
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
            <form action={CreateProduct} className="space-y-6">
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
              <div className="space-y-2">
                <FormLabel>Product Rating</FormLabel>
                <input type="hidden" name="rating" value={ratingValue} />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= ratingValue
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingClick(star)}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {ratingValue > 0 ? `${ratingValue} out of 5` : "No rating"}
                  </span>
                </div>
                <FormDescription>
                  Click on the stars to set a rating
                </FormDescription>
              </div>

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
                <Link href="/dashboard/products">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Saving...</>
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
    </div>
  );
}
