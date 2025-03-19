/*
login, signUp -> post methods are done through useMutaion

*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp } from "@/lib/auth-client";
import { useDispatch } from "react-redux";
import { setLoading, setError, setUser, setToken } from "@/lib/store/Slices/authSlice";
import { toast } from "sonner";

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const signInMutation = useMutation({
    mutationFn: async (Credential: { email: string; password: string }) => {
      dispatch(setLoading(true));
      const response = await signIn.email({
        email: Credential.email,
        password: Credential.password,
      });

      if (response?.error) {
        dispatch(
          setError(
            response.error?.message ||
              "An unknown error occured during signIn Mutation"
          )
        );
        throw new Error(response.error.message || "Sign-in failed");
      }

      return response;
    },

    onSuccess: (response) => {
      dispatch(setLoading(false));
      dispatch(setToken(response.data?.token || ''))
      if ("data" in response && response.data) {
        const sanitizedUser = {
          ...response.data.user,
          createdAt: response.data.user.createdAt?.toISOString(), // Serialize date
          updatedAt: response.data.user.updatedAt?.toISOString(), // Serialize date
        };

        dispatch(setUser(sanitizedUser));
        queryClient.invalidateQueries({ queryKey: ["session"] });
      }
    },

    onError: (error) => {
      dispatch(setLoading(false));
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";

      dispatch(setError(message));
      toast.error(error.message);
      
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (Credential: {
      email: string;
      password: string;
      name: string;
    }) => {
      dispatch(setLoading(true));

      const response = await signUp.email({
        email: Credential.email,
        password: Credential.password,
        name: Credential.name,
      });
      console.log(response);
      if (response?.error) {
        dispatch(setError(response.error?.message || "An unknown error occured during signUp Mutation"));
        throw new Error(response.error.message || "Sign-up failed");
      }

      return response;
    },
    onSuccess: (response) => {
      dispatch(setLoading(false));
      dispatch(setToken(response.data?.token || ""));
      if ("data" in response && response.data) {
        const sanitizedUser = {
          ...response.data.user,
          createdAt: response.data.user.createdAt?.toISOString(), // Serialize date
          updatedAt: response.data.user.updatedAt?.toISOString(), // Serialize date
        };

        dispatch(setUser(sanitizedUser));
        queryClient.invalidateQueries({ queryKey: ["session"] });
      }
    },

    onError: (error) => {
      toast.error(error.message);
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    },
    
  });

  

  return { signInMutation, signUpMutation };
};
