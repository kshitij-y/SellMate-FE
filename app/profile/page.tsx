import LogoutButton from "@/components/logout";
import NavBar from "@/components/NavBar";
import ProfileSection from "@/components/Profile";
import ProfileBox from "@/components/ProfileBox";
import { Button } from "@/components/ui/button";
import { User, Heart, ShoppingCart } from "lucide-react";

export default function Page() {
  //logout
  return (
    <div className="flex flex-col overflow-y-auto">
      <NavBar />
      <div className="flex overflow-y-auto">
        {/*Side bar */}
        <div className="hidden md:flex flex-col sticky top-0 pt-12 pb-24 px-6 min-w-[280px] w-[25%] h-screen border-r">
          {/* Profile Info */}
          <div className="h-18">
            <ProfileBox />
          </div>

          {/* Navigation Menu */}
          <div className="space-y-4">
            <Button variant="ghost" className="w-full justify-start">
              <User size={18} className="mr-2" /> My Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart size={18} className="mr-2" /> Cart
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart size={18} className="mr-2" /> Wishlist
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart size={18} className="mr-2" /> My Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart size={18} className="mr-2" /> Order History
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
            <div className="space-y-2 flex flex-col p-4">
              <a
                href="/privacy"
                className="text-sm text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-blue-500 hover:underline"
              >
                Terms of Service
              </a>
              <a href="/faq" className="text-sm text-blue-500 hover:underline">
                FAQ
              </a>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <LogoutButton />
          </div>
        </div>

        {/* divider */}
        <div className="h-screen border-l"></div>

        <div className="flex-1 p-6 items-center justify-center">
          <div className="flex">
            <ProfileSection />
          </div>
        </div>
      </div>
    </div>
  );
}
