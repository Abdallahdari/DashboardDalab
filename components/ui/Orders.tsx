"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function AdminOrdersPage({ orders }) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}

      {/* Orders Table */}
      <Card className="border border-amber-50 shadow-md">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Customer</TableHead>

                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) =>
                  order.OrderItems.map((item) => (
                    <TableRow key={`${order.id}-${item.id}`}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <Image
                          height={200}
                          width={200}
                          src={item.Product?.image || "/placeholder.svg"}
                          alt={item.Product?.name || "No name"}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      </TableCell>
                      <TableCell>
                        {item.Product?.name || "No Product"}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {order.User?.name || "No Name"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.User?.email || "No Email"}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{item.quatitiy}</TableCell>
                      <TableCell>
                        ${item.Product?.price?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-right">
                        $
                        {(
                          (item.quatitiy || 0) * (item.Product?.price || 0)
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Product Details - Order #{order.id}
                              </DialogTitle>
                              <DialogDescription>
                                Complete product and order information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="border rounded-lg p-4">
                                <div className="flex gap-4">
                                  <Image
                                    height={400}
                                    width={400}
                                    src={
                                      item.Product?.image || "/placeholder.svg"
                                    }
                                    alt={item.Product?.name || "No name"}
                                    className="w-24 h-24 object-cover rounded-md border"
                                  />
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold">
                                      {item.Product?.name}
                                    </h3>

                                    <div className="mt-2 space-y-1">
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Price:
                                        </span>{" "}
                                        ${item.Product?.price?.toFixed(2)}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Quantity:
                                        </span>{" "}
                                        {item.quatitiy}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Total:
                                        </span>{" "}
                                        $
                                        {(
                                          (item.quatitiy || 0) *
                                          (item.Product?.price || 0)
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
