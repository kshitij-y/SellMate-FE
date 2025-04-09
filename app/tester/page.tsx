"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/TanStack-Query/api";
import ApiResponse from "@/lib/types/apiResponse";

export default function PlaceOrderForm() {
  const [cartItems, setCartItems] = useState<
    { product_id: string; quantity: number }[]
  >([]);
  const [location, setLocation] = useState({
    city: "",
    state: "",
    zip: "",
    address: "",
  });

  const addProductToCart = () => {
    setCartItems((prev) => [...prev, { product_id: "", quantity: 1 }]);
  };

  const isValidUUID = (value: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value
    );

  const updateCartItem = (
    index: number,
    key: "product_id" | "quantity",
    value: string | number
  ) => {
    if (
      key === "product_id" &&
      typeof value === "string" &&
      !isValidUUID(value)
    ) {
      toast.error("Invalid product ID format.");
      return;
    }

    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };


  const removeCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: async () => {
      if (cartItems.length === 0) throw new Error("Cart is empty");
      if (!location.city || !location.address)
        throw new Error("Location details are required");

      const response = await fetcher<ApiResponse<{ orderId: string }>>(
        "/api/user/orders/placeOrder",
        {
          method: "POST",
          body: JSON.stringify({ cartItems, location }),
          credentials: "include",
        }
      );

      if (!response.success) throw new Error(response.error || "Order failed");
      return response;
    },
    onSuccess: () => {
      toast.success("Order placed successfully!");
      setCartItems([]);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to place order");
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Place an Order</h1>

      {cartItems.map((item, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <label className="block font-semibold">Product ID</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter product ID"
            value={item.product_id}
            onChange={(e) =>
              updateCartItem(index, "product_id", e.target.value)
            }
          />

          <label className="block font-semibold">Quantity</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-2"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateCartItem(index, "quantity", Number(e.target.value))
            }
          />

          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => removeCartItem(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        onClick={addProductToCart}>
        Add Product
      </button>

      <div className="mb-4">
        <label className="block font-semibold">City</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter city"
          value={location.city}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, city: e.target.value }))
          }
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">State</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter state"
          value={location.state}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, state: e.target.value }))
          }
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Zip Code</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter zip code"
          value={location.zip}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, zip: e.target.value }))
          }
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Address</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter full address"
          value={location.address}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>

      <button
        className="w-full bg-green-500 text-white py-2 rounded disabled:bg-gray-400"
        onClick={() => placeOrder()}
        disabled={isPending}>
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
