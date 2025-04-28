"use client";

import Link from "next/link";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Signout } from "@/app/_lib/action";
// types/SessionUser.ts
export interface SessionUser {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}
interface NavbarProps {
  toggleSidebar?: () => void;
  session:
    | SessionUser
    | {
        user?: {
          name?: string | null;
          email?: string | null;
          image?: string | null;
        };
      }
    | null;
}
const Logout = async () => {
  await Signout();
};

export function Navbar({ toggleSidebar, session }: NavbarProps) {
  return (
    <header className="flex items-center justify-between py-4 border-b border-gray-200 my-4">
      <h1 className="text-3xl font-bold">Dalab AdminPanel</h1>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full bg-gray-200"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>
                  {session?.user?.name
                    ? session.user.name.charAt(0).toUpperCase()
                    : ""}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border bg-white border-amber-50 shadow-md z-50 "
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal z-50">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.email ? session.user.email.split("@")[0] : ""}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user.email ? session.user.email : ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="hover:bg-gray-300 rounded-md  cursor-pointer transition-all duration-300 ">
              <Link href="/dashboard/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <form method="post">
              <button
                onClick={Logout}
                className=" hover:bg-gray-300 rounded-md w-full"
              >
                <DropdownMenuItem className="text-destructive  cursor-pointer transition-all duration-300  focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
