"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Image from "next/image";
import useUserProfile from "@/lib/hooks/useUserProfile";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ProfileBoxProps {
  showEmail?: boolean;
}

export default function ProfileBox({showEmail = true}: ProfileBoxProps) {
  useUserProfile();

  const { user, loading } = useSelector((state: RootState) => state.auth);

  const name = user?.name || "Guest User";
  const email = user?.email || "guest@email.com";

  const avatarUrl =
    user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Image
        src={avatarUrl}
        alt="Profile"
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover border"
      />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        {showEmail && <p className="text-sm text-gray-500">{email}</p>}
        {!showEmail && (
          <Link href="/profile" passHref>
            <p className="text-sm text-blue-500 hover:underline cursor-pointer">
              View Profile
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
