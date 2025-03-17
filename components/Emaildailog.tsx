import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupWithEmailDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="my-4 h-12 p-6 w-full text-lg font-medium"
          variant="outline"
        >
          Sign up with Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign Up</DialogTitle>
          <DialogDescription className="text-base">
            Enter your details to create an account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              required
              className="h-12 text-lg"
            />
          </div>

          <Button className="w-full h-12 text-lg">Create account</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
