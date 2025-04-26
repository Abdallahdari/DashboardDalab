import { GetBlogs } from "@/app/_lib/data";
import React from "react";
import BlogsPage from "./Blogs";

export default async function page() {
  const blog = await GetBlogs();
  console.log(blog);
  return (
    <div>
      <BlogsPage blog={blog} />
    </div>
  );
}
