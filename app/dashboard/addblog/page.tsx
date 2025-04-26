import React from "react";
import AddBlogPage from "./AddBlog";
import { GetBlogs } from "@/app/_lib/data";
import { auth } from "@/app/_lib/auth";

export default async function page() {
  const Allblogs = await GetBlogs();
  const session = await auth();
  const name = session?.user?.email;
  const uniqueCategories = [
    ...new Set(Allblogs?.map((blog: any) => blog.Category).filter(Boolean)),
  ];
  console.log(uniqueCategories);
  console.log(name);

  return (
    <div>
      <AddBlogPage uniqueCategories={uniqueCategories} session={session} />
    </div>
  );
}
