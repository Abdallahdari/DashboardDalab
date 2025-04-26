import { AllProduct } from "@/app/_lib/data";
import React from "react";
import Product from "@/app/dashboard/Product/Product";

export default async function Page() {
  const products = await AllProduct();
  console.log(products);

  return (
    <div>
      <Product products={products} />
    </div>
  );
}
