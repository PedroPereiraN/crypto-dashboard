'use client'

import { useFavoritesStore } from "@/stores/favorites-store"
import { useCoinsMarketValues } from "@/hooks/coins-market-values"
import { CoingeckoCryptoCoinMarketData } from "@/utils/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { numberMask } from "@/utils/masks";
import { cn } from "@/lib/utils";

export function FavoriteCoins() {

  const favoritesStore = useFavoritesStore()

  const {
    isPending: isPendingCoinsMarketValues,
    error: errorsCoinsMarketValues,
    data: coinsMarketValues,
  } = useCoinsMarketValues([])

  if (isPendingCoinsMarketValues) return "Carregando...";

  if (errorsCoinsMarketValues) return "Oops, ocorreu um erro: " + errorsCoinsMarketValues.message;

  const favs = coinsMarketValues.filter((coin: CoingeckoCryptoCoinMarketData) => favoritesStore.favorites.includes(coin.id.toLowerCase()))

  return (
    <div className="grid grid-cols-3 gap-4">
      {
        favs.map((fav: CoingeckoCryptoCoinMarketData, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                { fav.name }
              </CardTitle>

              <CardDescription>
                Additional information about the cryptocurrency: { fav.name }
              </CardDescription>
            </CardHeader>

            <CardContent className={
              cn(
                "flex",
                "flex-col",
                "gap-1"
              )
            }>
              <p>
              <strong>Price:</strong> R$ { numberMask(fav.current_price, 2) }
              </p>
              <p>
              <strong>Market cap:</strong> R$ { numberMask(fav.market_cap, 2) }
              </p>
              <p>
              <strong>24h Volume:</strong> R$ { numberMask(fav.total_volume, 2) }
              </p>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
}
