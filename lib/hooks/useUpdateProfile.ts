import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import ApiResponse from "../types/apiResponse";
import User from "../types/User";
import { fetcher } from "../TanStack-Query/api";
import { setUser, setLoading, setError } from "@/lib/store/Slices/authSlice";

const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateUserProfile = useCallback(
    async (updatedUser: Partial<User>) => {
      setUpdating(true);
      setUpdateError(null);

      try {
        const result = await fetcher<ApiResponse<User>>("/api/user/profile/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
          credentials: "include",
        });

        if (result?.success && result.data) {
          dispatch(setUser(result.data));
        } else {
          setUpdateError(result?.error || "Failed to update profile");
        }
      } catch (error: any) {
        setUpdateError(error.message || "An unknown error occurred");
      } finally {
        setUpdating(false);
      }
    },
    [dispatch]
  );

  return { updateUserProfile, updating, updateError };
};

export default useUpdateProfile;
