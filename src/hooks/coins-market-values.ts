import { useQuery } from "@tanstack/react-query";
import { getCoinsRecentValues } from "@/services/queries";

export function useCoinsMarketValues(coinsIds?: string[]) {
  return useQuery({
    enabled: !!coinsIds && coinsIds.length > 0,
    queryFn: () => getCoinsRecentValues(coinsIds!),
    queryKey: ["first-coin"],
  });
}
