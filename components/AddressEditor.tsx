"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useAddress from "@/lib/hooks/useAddress";
import { useProfile } from "@/lib/hooks/useProfile";
import Loader from "./ui/Loader";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AddressEditor() {
  const { user } = useProfile();
  const { address, loading, error, fetchAddress, addAddress, updateAddress } = useAddress();
  const [open, setOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    country: address?.country || "",
    state: address?.state || "",
    city: address?.city || "",
    postal_code: address?.postal_code || "",
    phone: address?.phone || "",
    address: address?.address || "",
  });

  useEffect(() => {
    if (address) {
      setAddressForm((prev) => ({
        ...prev,
        ...address,
      }));
    }
  }, [address]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!user?.id) {
      console.error("User ID not found");
      return;
    }

    try {
      if (address) {
        await updateAddress(addressForm);
      } else {
        await addAddress(addressForm);
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setOpen(true)}>
            {address ? "Edit Address" : "Add Address"}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {address ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {[
              "country",
              "state",
              "city",
              "postal_code",
              "phone",
              "address",
            ].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field.replace("_", " ").toUpperCase()}
                </Label>
                <Input
                  id={field}
                  value={addressForm[field as keyof typeof addressForm]}
                  onChange={handleAddressChange}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : address ? (
                "Update Address"
              ) : (
                "Add Address"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
