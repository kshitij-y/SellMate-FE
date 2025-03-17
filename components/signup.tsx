import { SignupWithEmailDialog } from "./Emaildailog";
import { Button } from "./ui/button";
import LineText from "@/components/lineText";

export const Signup = () => {
  return (
    <div className="flex flex-col w-[450px]">
          <div className="font-bold text-2xl my-2 p-2">
              Sign up to SellMate
          </div>
          <Button className="my-4 h-12 p-6">
              Sign up with Google
          </Button>

          <LineText text="or" />

          <SignupWithEmailDialog />
          
          <div className="text-center text-sm text-gray-500 space-y-2 mt-4">
        <p>
          By creating an account you agree with our{" "}
          <a href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </a>
          ,{" "}
          <a href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          , and our default{" "}
          <a href="/notifications" className="underline hover:text-gray-700">
            Notification Settings
          </a>
          .
        </p>
        <p>
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="font-medium text-black hover:underline dark:text-white"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};
