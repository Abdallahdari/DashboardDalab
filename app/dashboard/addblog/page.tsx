import { auth } from "@/app/_lib/auth";
import AddBlogPage from "./AddBlog";

export default async function page() {
  const session = await auth();

  return <div>{session && <AddBlogPage session={session} />}</div>;
}
