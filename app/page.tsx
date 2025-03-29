"use client";

import { useEffect } from "react";
import { TopBar } from "@/components/TopBar";
import { AppSidebar } from "@/components/SideBar"; // Import the Sidebar
import { toast } from "sonner";
import NavBar from "@/components/NavBar";

export default function Home() {
  useEffect(() => {
    toast("Welcome to SellMate! 🚀");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar */}
      <NavBar />

      {/* main */}
      <main>
        <div>
          topSelling
        </div>
        <div>
          best Rated
        </div>
        <div>
          Live Auction
        </div>
        <div>
          Upcoming Auction
        </div>
      </main>
    </div>
  );
}
