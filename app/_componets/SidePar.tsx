import React from "react";
import { auth } from "../_lib/auth";
import { Navbar } from "@/components/ui/Navbar";

export default async function SidePar() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <Navbar session={session} />
    </div>
  );
}
