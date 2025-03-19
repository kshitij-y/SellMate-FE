import BuySellAuction from "@/components/BuySellAuction";
import { Signup } from "@/components/signup";
import { Logo } from "@/components/Logo";
export default function Page() {
  return (
    <div className="flex items-center min-h-screen">
      <div className="hidden lg:block w-[30%] bg-black h-screen">
        <div className="text-white">
          <Logo />
        </div>
        <div className="mt-4">
          <img
            src="https://cdn.dribbble.com/uploads/60700/original/bb339e5ba35e549b32d989be548c908d.png?1740610182"
            alt="Framer logo"
          ></img>
        </div>
        <BuySellAuction />
      </div>
      <div className="mx-auto ">
        <Signup />
      </div>
    </div>
  );
}
