"use client";

import { useState } from "react";
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
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Createblog } from "@/app/_lib/action";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  smallContent: z.string().min(10, {
    message: "Small content must be at least 10 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
  publishDate: z.string().min(1, {
    message: "Please select a publish date.",
  }),
  featuredImage: z.string().optional(),
  authorName: z.string().optional(),
  smallDesr: z.string().optional(),
  authorAvatar: z.string().optional(),
});

export default function AddBlogPage({ session }) {
  const [isSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      smallContent: "",
      content: "",
      category: "",
      status: "draft",
      publishDate: new Date().toISOString().split("T")[0],
      featuredImage: "",
      authorName: "",
      authorAvatar: "",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/blog">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Add New Blog</h1>
      </div>

      <Card className="border border-amber-50 shadow-md">
        <CardHeader>
          <CardTitle>Blog Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={Createblog} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter blog title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="smallDesr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Small Description</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Enter image URL"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter Small Description of the blog you are posting
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Enter image URL"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the featured image of your blog post
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input
                          className="cursor-not-allowed"
                          placeholder={
                            session?.user.email?.split("@")[0] || "Author"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Admin that posted this field
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authorAvatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Image</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Enter author image URL"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the featured image of the Author
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish Date</FormLabel>
                      <FormControl>
                        <Input required type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        When should this blog post be published
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your blog content here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Link href="/dashboard/blogs">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Blog
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
