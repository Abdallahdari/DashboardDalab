"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { Createblog } from "@/app/_lib/action";
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
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
export interface SessionUser {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}
interface SessionProbs {
  session:
    | SessionUser
    | {
        user?: {
          name?: string | null;
          email?: string | null;
          image?: string | null;
        };
      }
    | null;
}
export default function AddBlogPage({ session }: SessionProbs) {
  const [isSubmitting, setisSubmiting] = useState(false);
  const router = useRouter();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisSubmiting(true);
    const formValues = form.getValues();

    if (!formValues.title) {
      toast.error("Title is required");
      setisSubmiting(false);
      return;
    }

    if (!formValues.featuredImage) {
      toast.error("Featured image is required");
      setisSubmiting(false);
      return;
    }

    if (!formValues.smallDesr) {
      toast.error("Small description is required");
      setisSubmiting(false);
      return;
    }
    try {
      const formData = new FormData(e.target);
      await Createblog(formData);
      toast.success("Blog has been created sucessfully", {
        autoClose: 2000,
        // Auto-close after 2 seconds
        onClose: () => {
          // Navigate to the dashboard/blog page when the toast closes
          router.push("/dashboard/blog");
        },
      });
    } catch (error) {
      toast.error("Error creating blog");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Input placeholder="Enter image URL" {...field} />
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
                        <Input placeholder="Enter image URL" {...field} />
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
                          readOnly
                          className="cursor-not-allowed"
                          placeholder={
                            session?.user?.email
                              ? session.user.email.split("@")[0]
                              : ""
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
                        <Input type="date" {...field} />
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
                <Link href="/dashboard/blogs"></Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover:bg-slate-950 cursor-pointer bg-gray-300 rounded-md hover:text-white"
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
    </div>
  );
}
