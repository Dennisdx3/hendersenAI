import { useAuth } from "@clerk/nextjs";

export default function useFetch() {
  const { getToken } = useAuth();

  const authenticatedFetch = async (...args) => {
    return fetch(...args, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json());
  };

  return authenticatedFetch;
}
