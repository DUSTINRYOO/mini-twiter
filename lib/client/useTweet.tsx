import useSWR from "swr";

export default function useTweet() {
  const { data, error } = useSWR("/api/tweet");

  return { data, isLoading: error };
}
