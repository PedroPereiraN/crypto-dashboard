import { useFavoritesStore } from "@/stores/favorites-store";
import { useMainChartStore } from "@/stores/main-chart-items";
import { useCoinsMarketValues } from "@/hooks/coins-market-values";
import { useQuery } from "@tanstack/react-query";
import { getCoinsList } from "@/services/queries";
import {
  CoingeckoCryptoCoinInfo,
  CoingeckoCryptoCoinMarketData,
} from "@/utils/types";

export function useCoinsSection() {
  const favoriteStore = useFavoritesStore();
  const mainChartStore = useMainChartStore();

  const coinsQuery = useQuery({
    queryFn: () => getCoinsList(),
    queryKey: ["coins"],
  });

  const marketValuesQuery = useCoinsMarketValues(
    coinsQuery.data?.map((coin: CoingeckoCryptoCoinInfo) => coin.id),
  );

  const chartData = marketValuesQuery.data
    ?.map((coin: CoingeckoCryptoCoinMarketData) => ({
      id: coin.id,
      currentValue: coin.current_price,
      coinSymbol: coin.symbol,
    }))
    .filter(
      (coin: { id: string }) =>
        !mainChartStore.itemsToHide.includes(coin.id.toLowerCase()),
    );

  return {
    favoriteStore,
    mainChartStore,
    coinsQuery,
    marketValuesQuery,
    chartData,
  };
}
