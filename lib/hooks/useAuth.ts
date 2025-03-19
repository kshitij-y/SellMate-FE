/*
log out code
signOut -> logout from backend
clearSession -> logout from frontend
*/
"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, signOut as clearSession } from "@/lib/store/Slices/authSlice";
import { RootState } from "@/lib/store/store";

export const useAuth = () => {
  const { data: session, isPending } = useSession();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isPending) return;

    if (session) {
      dispatch(setUser(session.user));
    } else {
      dispatch(clearSession());
    }
  }, [session, isPending, dispatch]);

  const logout = async () => {
    await signOut();
    dispatch(clearSession());
  };

  return { user, loading, error, logout };
};
