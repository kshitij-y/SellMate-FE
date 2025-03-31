"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useUpdateUserProfile from "@/lib/hooks/useUpdateProfile";

export default function ProfileEditor() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { updateUserProfile } = useUpdateUserProfile();

  const [userForm, setUserForm] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setUserForm({
        name: user?.name || "",
        image: user?.image || "",
      });
    }
  }, [user]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-6">
      {/* Edit Profile Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userForm.name}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                value={userForm.image}
                onChange={handleUserChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => updateUserProfile(userForm)}>
              Save Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
