import React from "react";
import AddBlogPage from "./AddBlog";
import { GetBlogs } from "@/app/_lib/data";
import { auth } from "@/app/_lib/auth";

export default async function page() {
  const session = await auth();

  return <div>{session && <AddBlogPage session={session} />}</div>;
}
