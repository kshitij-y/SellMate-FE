"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import ProfileEditor from "./ProfileEditor";
import AddressEditor from "./AddressEditor";
import Loader from "./ui/Loader";

export default function ProfilePage() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const { address } = useSelector((state: RootState) => state.address);

  if (loading) return <Loader />;

  const name = user?.name || "User";
  const email = user?.email || "No Email";
  const image = user?.image || "";
  const joined = user?.createdAt
    ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })
    : "Unknown";
  const updated = user?.updatedAt
    ? formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true })
    : "Unknown";

  const phone = address?.phone || "No Phone";
  const fullAddress = address
    ? `${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.postal_code}`
    : "No Address Provided";

  return (
    <div className="flex min-h-screen p-8">
      <main className="flex-1">
        <Card className="w-full shadow-lg rounded-lg">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Profile</CardTitle>
              <p className="text-sm text-gray-500">
                Manage your profile information
              </p>
            </div>
            <div className="flex gap-4">
              <ProfileEditor />
              <AddressEditor />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{name}</h2>
                  <p className="text-gray-500">{email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                  Phone: <span className="font-medium">{phone}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Address: <span className="font-medium">{fullAddress}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Joined: <span className="font-medium">{joined}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Last Updated: <span className="font-medium">{updated}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
