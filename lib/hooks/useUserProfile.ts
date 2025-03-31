import { useEffect } from "react";
import { useDispatch } from "react-redux"
import ApiResponse from "../types/apiResponse";
import User from "../types/User";
import { fetcher } from "../TanStack-Query/api";
import { setUser, setLoading, setError } from "@/lib/store/Slices/authSlice";


const useUserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfile = async () => {
      dispatch(setLoading(true));

      try {
        const result = await fetcher<ApiResponse<User>>("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (result?.success && result.data) {
          dispatch(setUser(result.data));
        } else {
          dispatch(setError(result?.error || "Failed to load profile"));
        }
      } catch (error: any) {
        dispatch(setError(error.message || "An unknown error occurred"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getUserProfile();
  }, [dispatch]);

};

export default useUserProfile;