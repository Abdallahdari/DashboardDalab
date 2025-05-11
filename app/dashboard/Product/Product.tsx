"use client";

import Link from "next/link";
import Image from "next/image";
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
import { ToastContainer, toast } from "react-toastify";

import { DeleteProduct } from "@/app/_lib/action";
// Mock data for products
interface Product {
  id: string;
  name: string;
  price: number;
  sizes: string;
  stock: number;
  image: string;
  Quantity: number;
}
interface ProductsPageProps {
  products: Product[];
}
export default function ProductsPage({ products }: ProductsPageProps) {
  //   const [products, setProducts] = useState(initialProducts);

  const DeleteProducts = async (id: string) => {
    await DeleteProduct(id);
    toast.success("deleted sucessfully", {
      duration: 2000,
      onClose: () => {
        window.location.reload();
      },
    });
  };
  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-semibold">Manage Products</h1>
        <Link href="/dashboard/Productadd">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      <Card className="border border-amber-50 shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Sizes</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No products found. Try a different search term or add a new
                    product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        height={40}
                        width={40}
                        src={
                          item.image && item.image.startsWith("http")
                            ? item.image
                            : "/placeholder.svg"
                        }
                        alt={item.name}
                        className="w-16 h-16 rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>

                    <TableCell className="hidden md:table-cell">
                      ${item.price}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.sizes?.map((item) => (
                        <span
                          className="mr-2 font-semibold uppercase"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell className=" md:table-cell flex items-center gap-4 ">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.Quantity > 50
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : item.Quantity > 20
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {item.Quantity}
                      </span>
                      <span
                        className={`inline-flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.Quantity > 50
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : item.Quantity > 20
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {item.Quantity > 50
                          ? "In Stock"
                          : item.Quantity > 20
                          ? "Low Stock"
                          : "Out of Stock"}
                      </span>
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
                          <Button onClick={() => DeleteProducts(item.id)}>
                            {" "}
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </Button>
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

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this product?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
