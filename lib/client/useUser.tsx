import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.push("/create-account");
    }
    if (error) {
      router.push("/create-account");
    }
  }, [error]);
  return { user: data?.user, isLoading: error };
}
