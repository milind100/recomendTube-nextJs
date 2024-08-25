"use client";
import { useSession } from "next-auth/react";

const useGetSession = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return { session, status, isLoading };
};

export default useGetSession;
