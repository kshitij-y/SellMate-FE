import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetcher } from "@/lib/TanStack-Query/api";
import ApiResponse from "@/lib/types/apiResponse";
import Address from "@/lib/types/address";
import { setAddress, setError } from "@/lib/store/Slices/addressSlice";

const useUpdateAddress = () => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateAddress = useCallback(
    async (updatedAddress: Omit<Address, "id" | "user_id">) => {
      setUpdating(true);
      setUpdateError(null);

      try {
        const result = await fetcher<ApiResponse<Address>>(
          "/api/user/address/updateAddress",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAddress),
            credentials: "include",
          }
        );

        if (result?.success && result.data) {
          dispatch(setAddress(result.data));
        } else {
          setUpdateError(result?.error || "Failed to update address");
        }
      } catch (error: any) {
        setUpdateError(error.message || "An unknown error occurred");
      } finally {
        setUpdating(false);
      }
    },
    [dispatch]
  );

  return { updateAddress, updating, updateError };
};

export default useUpdateAddress;
