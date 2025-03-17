"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LineText from "@/components/lineText";
import { useRouter } from "next/navigation";
export const Signin = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-[450px]">
      <div className="font-bold text-2xl my-2 p-2">Sign in to SellMate</div>
      <Button className="my-4 h-12 p-6" variant={"outline"}>
        Sign up with Google
      </Button>

      <LineText text="or sign in with email" />
      <div>
        <div className="space-y-2 py-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-12 text-lg"
          />
        </div>

        <div className="space-y-2 mt-6">
          <div className="flex justify-between py-1">
            <Label htmlFor="password">Password</Label>
            <Label htmlFor="password" className="underline cursor-pointer">
              <p onClick={() => {router.push("/auth/verify-email")}}>Forgot ?</p>
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="h-12 text-lg"
          />
        </div>

        <Button className="w-full h-12 text-lg my-6">Sign in</Button>
        <div className="text-center text-sm text-gray-500 space-y-2 mt-4">
          <p>
            Don't have an account?{" "}
            <a
              href="/auth/signup"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
