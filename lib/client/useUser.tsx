import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/me");
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data?.ok) {
      router.push("/create-account");
    }
  }, [data, error, router]);

  return { user: data?.user, isLoading: !data && !error };
}
