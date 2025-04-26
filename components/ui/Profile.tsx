import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Briefcase } from "lucide-react";

export default function ProfilePage({ session }) {
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    jobTitle: "Product Manager",
    avatarUrl: "/placeholder.svg?height=96&width=96",
    initials: "JD",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold ">Your Profile</h1>
        <p className="text-muted-foreground">Your personal information.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-amber-50 shadow-md   transition-all duration-300">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 bg-gray-200 rounded-full">
                  <AvatarImage
                    src={userData.avatarUrl || "/placeholder.svg"}
                    alt="Profile"
                  />
                  <AvatarFallback className="text-2xl">
                    {session?.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="font-medium">
                      {" "}
                      {session?.user.email.split("@")[0]}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Job Title
                    </p>
                  </div>
                  <p className="font-medium">Admin</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-amber-50 shadow-md   transition-all duration-300">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Your contact details for notifications and updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
