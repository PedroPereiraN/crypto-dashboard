import { geckoClient } from "@/lib/axios";
import {
  CoingeckoCryptoCoinInfo,
  CoingeckoCryptoCoinMarketData,
} from "@/utils/types";

export async function getCoinsList(): Promise<CoingeckoCryptoCoinInfo[]> {
  const response = await geckoClient.get<
    CoingeckoCryptoCoinInfo[],
    { data: CoingeckoCryptoCoinInfo[] }
  >("/coins/markets", {
    params: {
      x_cg_demo_api_key: process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? null,
      vs_currency: "brl",
      per_page: 10,
      page: 1,
      order: "price_desc",
    },
  });

  return response.data;
}

export async function getCoinsRecentValues(
  coinsIds: string[],
): Promise<CoingeckoCryptoCoinMarketData[]> {
  const response = await geckoClient.get<
    CoingeckoCryptoCoinMarketData[],
    { data: CoingeckoCryptoCoinMarketData[] }
  >(`coins/markets`, {
    params: {
      vs_currency: "brl",
      ids: coinsIds.toString(),
      price_change_percentage: "24h",
      x_cg_demo_api_key: process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? null,
    },
  });

  return response.data;
}
