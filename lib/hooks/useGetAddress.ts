import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { fetcher } from "@/lib/TanStack-Query/api";
import ApiResponse from "@/lib/types/apiResponse";
import Address from "@/lib/types/address";
import {
  setAddress,
  setLoading,
  setError,
} from "@/lib/store/Slices/addressSlice";

const useGetAddress = () => {
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector(
    (state: RootState) => state.address
  );

  useEffect(() => {
    const fetchAddress = async () => {
      dispatch(setLoading(true));

      try {
        const result = await fetcher<ApiResponse<Address>>(
          "/api/user/address/getAddress",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (result?.success && result.data) {
          dispatch(setAddress(result.data));
        } else {
          dispatch(setError(result?.error || "Failed to load address"));
        }
      } catch (error: any) {
        dispatch(setError(error.message || "An unknown error occurred"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAddress();
  }, [dispatch]);

  return { address, loading, error };
};

export default useGetAddress;
