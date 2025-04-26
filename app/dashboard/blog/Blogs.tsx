"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { DeleteBlogs } from "@/app/_lib/action";
import { toast, ToastContainer } from "react-toastify";

// Mock data for blogs
const initialBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    category: "Development",
    status: "Published",
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    category: "Technology",
    status: "Draft",
    date: "2023-05-20",
  },
  {
    id: "3",
    title: "Mastering Tailwind CSS",
    category: "Design",
    status: "Published",
    date: "2023-05-25",
  },
  {
    id: "4",
    title: "Building Responsive Layouts",
    category: "Design",
    status: "Published",
    date: "2023-06-01",
  },
  {
    id: "5",
    title: "Introduction to TypeScript",
    category: "Development",
    status: "Draft",
    date: "2023-06-05",
  },
];

export default function BlogsPage({ blog }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const confirmDelete = () => {
    if (blogToDelete) {
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete));
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };
  const DeleteBlog = async (id) => {
    await DeleteBlogs(id);
    toast.success("Deleted Successfully", {
      duration: 1000,
      onClose: () => window.location.reload(),
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  return (
    <div className="space-y-6 pb-6 ">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Manage Blogs</h1>
        <Link href="/dashboard/addblog">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Blog
          </Button>
        </Link>
      </div>

      <Card className="border border-amber-50 shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {" "}
                <TableHead className="hidden md:table-cell">Image</TableHead>
                <TableHead className="hidden md:table-cell">Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Small Discrition
                </TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blog.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No blogs found. Try a different search term or add a new
                    blog.
                  </TableCell>
                </TableRow>
              ) : (
                blog.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">
                      <Image
                        src={
                          blog.image && blog.image.startsWith("http")
                            ? blog.image
                            : "/placeholder.svg"
                        }
                        height={40}
                        width={40}
                        alt={`Blog ${blog.id}`}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ">
                        {blog.topic}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {blog.Smlldescription
                          ? blog.Smlldescription.slice(1, 20)
                          : "No Description"}
                      </span>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {blog.aouther}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {blog.Date}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white shadow-md z-50"
                        >
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => DeleteBlog(blog.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this blog?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
