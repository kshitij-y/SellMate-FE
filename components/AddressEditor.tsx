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
import useUpdateAddress from "@/lib/hooks/useUpdateAddress";
import useAddAddress from "@/lib/hooks/useAddAddress";
import useGetAddress from "@/lib/hooks/useGetAddress";

export default function AddressEditor() {
  useGetAddress();
  const { address } = useSelector((state: RootState) => state.address);
  const { user } = useSelector((state: RootState) => state.auth);
  const { updateAddress } = useUpdateAddress();
  const { addAddress } = useAddAddress();

  const [addressForm, setAddressForm] = useState({
    country: "",
    state: "",
    city: "",
    postal_code: "",
    phone: "",
    address: "",
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

  const handleSave = () => {
    if (!user?.id) {
      console.error("User ID not found");
      return;
    }

    const payload = {
      ...addressForm,
      user_id: user.id,
    };

    if (address) {
      updateAddress(payload); 
    } else {
      addAddress(payload);
    }
  };

  return (
    <div className="p-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
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
            <Button onClick={handleSave}>
              {address ? "Update Address" : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
