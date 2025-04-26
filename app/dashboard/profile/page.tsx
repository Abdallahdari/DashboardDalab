import { auth } from "@/app/_lib/auth";
import ProfilePage from "@/components/ui/Profile";
import React from "react";

export default async function page() {
  const session = await auth();
  return (
    <div>
      <ProfilePage session={session} />
    </div>
  );
}
