import React from "react";
import SidePar from "../_componets/SidePar";
import { Sidebar } from "@/components/ui/sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid  divide-y-gray-300 md:grid-cols-[20rem_1fr]  h-screen items-start gap-4">
      <Sidebar />

      <main className="max-w-[1100px] ">
        <SidePar />
        {children}
      </main>
    </div>
  );
}
