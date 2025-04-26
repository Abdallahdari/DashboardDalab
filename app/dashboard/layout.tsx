import { Sidebar } from "@/components/ui/sidebar";
import React from "react";
import SidePar from "../_componets/SidePar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid  divide-y-gray-300 md:grid-cols-[20rem_1fr] gap-4 h-screen items-start gap-4">
      <Sidebar />
      <main className="max-w-[1100px] ">
        <SidePar />
        {children}
      </main>
    </div>
  );
}
