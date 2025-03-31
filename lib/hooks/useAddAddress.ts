import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetcher } from "@/lib/TanStack-Query/api";
import ApiResponse from "@/lib/types/apiResponse";
import Address from "@/lib/types/address";
import { setAddress, setError } from "@/lib/store/Slices/addressSlice";

const useAddAddress = () => {
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const addAddress = useCallback(
    async (newAddress: Omit<Address, "id">) => {
      setAdding(true);
      setAddError(null);

      try {
        const result = await fetcher<ApiResponse<Address>>(
          "/api/user/address/addAddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAddress),
            credentials: "include",
          }
        );

        if (result?.success && result.data) {
          dispatch(setAddress(result.data));
        } else {
          setAddError(result?.error || "Failed to add address");
        }
      } catch (error: any) {
        setAddError(error.message || "An unknown error occurred");
      } finally {
        setAdding(false);
      }
    },
    [dispatch]
  );

  return { addAddress, adding, addError };
};

export default useAddAddress;
