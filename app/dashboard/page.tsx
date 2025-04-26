import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Package, TrendingUp } from "lucide-react";
import { GetallUsers } from "@/app/_lib/data";
import { GetBlogs } from "@/app/_lib/data";
import { AllProduct } from "@/app/_lib/data";

import { formatDistanceToNow } from "date-fns";

export default async function DashboardPage() {
  const Blogs = await GetBlogs();
  const Products = await AllProduct();
  const Users = await GetallUsers();
  console.log(Users, Products);
  return (
    <div className="space-y-6 ">
      <h1 className="text-xl font-semibold">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-amber-50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Blogs?.length}</div>
            <p className="text-xs text-muted-foreground">
              +
              <span className="mr-2">
                {
                  Blogs?.sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                  ).length
                }
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-amber-50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Products?.length}</div>
            <p className="text-xs text-muted-foreground">
              <p className="text-xs text-muted-foreground">
                +
                <span className="mr-2">
                  {Products?.sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                  ).length || 0}
                </span>
                from last month
              </p>
            </p>
          </CardContent>
        </Card>

        <Card className="border border-amber-50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Users?.length}</div>
            <p className="text-xs text-muted-foreground">
              +
              <span className="mr-2">
                {Users?.sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                ).length || 0}
              </span>
              from the last month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-amber-50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 pb-4">
        <Card className="border border-amber-50 shadow-md">
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>
              Latest blog posts added to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Blogs?.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
              .slice(0, 3)
              .map((blog) => (
                <div key={blog.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{blog.topic}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(blog.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="border border-amber-50 shadow-md">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>
              Latest products added to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Products?.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
              .slice(0, 3)
              .map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(product.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
