import React from "react";
import LoginPage from "./LoginPage";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div>
      <LoginPage />
    </div>
  );
}
