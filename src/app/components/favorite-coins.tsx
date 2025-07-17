'use client'

import { useFavoritesStore } from "@/stores/favorites-store"
import { useCoinsMarketValues } from "@/hooks/coins-market-values"
import { CoingeckoCryptoCoinMarketData } from "@/utils/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { numberMask } from "@/utils/masks";
import { cn } from "@/lib/utils";
import { Star, WifiOff } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

const MAX_FAVORITE = 3

export function FavoriteCoins() {

  const favoritesStore = useFavoritesStore()
  //this query is already executed in another component, I only need the data that the query returns
  //so I'm passing an empty array so the query is not redone
  const {
    isPending: isPendingCoinsMarketValues,
    error: errorsCoinsMarketValues,
    data: coinsMarketValues,
  } = useCoinsMarketValues([])

  if (isPendingCoinsMarketValues) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className={
          cn(
            "w-full",
            "h-56"
          )
        }/>
        <Skeleton className={
          cn(
            "w-full",
            "h-56"
          )
        }/>
        <Skeleton className={
          cn(
            "w-full",
            "h-56"
          )
        }/>
      </div>
    )
  }

  if (errorsCoinsMarketValues) {
    return (
      <div className="flex flex-col items-center justify-center h-56 gap-3">
        <WifiOff className="w-20 h-20"/>
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p>Could not load your favorite coins. Please try again later.</p>
      </div>
    )
  }

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
              <strong>Price:</strong> $ { numberMask(fav.current_price, 2) }
              </p>
              <p>
              <strong>Market cap:</strong> $ { numberMask(fav.market_cap, 2) }
              </p>
              <p>
              <strong>24h Volume:</strong> $ { numberMask(fav.total_volume, 2) }
              </p>
            </CardContent>
          </Card>
        ))
      }
      {
        new Array(MAX_FAVORITE - favs.length >=0 ? MAX_FAVORITE - favs.length : 0).fill(null).map((_, index) => (
          <Card key={index} className={
          cn(
            "w-full",
            "h-56"
          )
        }>
          <CardContent className="flex gap-3 items-center justify-center w-full h-full">
            <Star />
            <p>Add a new cryptocurrency to favorites</p>
          </CardContent>
        </Card>


        ))
      }
    </div>
  )
}
