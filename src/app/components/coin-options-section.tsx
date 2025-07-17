"use client";
import { useQuery } from "@tanstack/react-query";
import { getCoinsList } from "@/services/queries";
import { cn } from "@/lib/utils";
import { MainChart } from "./main-chart";
import { CoingeckoCryptoCoinInfo, CoingeckoCryptoCoinMarketData } from "@/utils/types";
import * as React from 'react';
import { Star, CircleMinus, CirclePlus, StarOff } from "lucide-react";
import Image from "next/image";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useMainChartStore } from "@/stores/main-chart-items";
import { useCoinsMarketValues } from "@/hooks/coins-market-values"
import { Button } from "@/components/ui/button";

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};



export function CoinsOptionsSection() {

const favoriteStore = useFavoritesStore()
const mainChartStore = useMainChartStore()

  const {
    isPending: isPendingCoins,
    error: errorCoins,
    data: coins,
  } = useQuery({
    queryFn: () => getCoinsList(),
    queryKey: ["coins"],
  });

  const {
    isPending: isPendingCoinsMarketValues,
    error: errorsCoinsMarketValues,
    data: coinsMarketValues,
  } = useCoinsMarketValues(coins?.map((coin: CoingeckoCryptoCoinInfo) => coin.id))

  if (isPendingCoins) return "Carregando...";

  if (errorCoins) return "Oops, ocorreu um erro: " + errorCoins.message;

  if (isPendingCoinsMarketValues) return "Carregando...";

  if (errorsCoinsMarketValues) return "Oops, ocorreu um erro: " + errorsCoinsMarketValues.message;

  const chartData = coinsMarketValues?.map((coin: CoingeckoCryptoCoinMarketData) => ({
    id: coin.id,
    currentBrlValue: coin.current_price,
    coinSymbol: coin.symbol
  })).filter((coin: { id: string }) => !mainChartStore.itemsToHide.includes(coin.id.toLowerCase()))

  const removeOrAddToMainChart = (id: string) => {
    const isHidden = mainChartStore.itemsToHide.includes(id.toLowerCase())
    if (isHidden) {
      mainChartStore.setItemsToHide(
        mainChartStore.itemsToHide.filter((item: string) => !(item == id.toLowerCase()))
      )
    } else {
      mainChartStore.setItemsToHide([
        ...mainChartStore.itemsToHide,
        id.toLowerCase()
      ])
    }

  }

  const removeOrAddToFavorites = (id: string) => {
    const isFavorite = favoriteStore.favorites.includes(id.toLowerCase())
    if (isFavorite) {
      favoriteStore.setFavorites(
        favoriteStore.favorites.filter((item: string) => !(item == id.toLowerCase()))
      )
    }

    if (!isFavorite && favoriteStore.favorites.length <= 2) {
      favoriteStore.setFavorites([
        ...favoriteStore.favorites,
        id.toLowerCase()
      ])
    }
  }

  const isFavorite = (coinId: string) => !!favoriteStore.favorites.includes(coinId.toLowerCase())
  const isHidden = (coinId: string) => !!mainChartStore.itemsToHide.includes(coinId.toLowerCase())

  return (
    <section>
      <h1 className={cn("text-3xl", "font-bold")}>Cryptocurrencies</h1>

      <div
        className={cn("flex", "flex-wrap", "gap-2", "items-center", "my-10", "relative")}
      >
        {coins?.map((coin: CoingeckoCryptoCoinInfo, index: number) => (
          <div
          key={index}
      className={cn(
        "p-4",
        "w-52",
        "h-20",
        "flex",
        "items-center",
        "justify-between",
        "bg-primary",
        "text-black",
        "rounded-lg",
      )}
    >
      <div className={
        cn(
          "flex",
          "flex-col",
          "items-start",
          "justify-center",
          "gap-1",
        )
      }>
       <Image
        loader={imageLoader}
        src={coin.image}
        alt="logo"
        width={30}
        height={30}
      />
      <p>{coin.name}</p>
      </div>

      <div className="flex flex-col gap-1">
        <Button
          type="button"
          className={
            cn(
              "cursor-pointer",
              "bg-yellow-300",
              "hover:bg-yellow-300/60",
              "rounded-full",
              "w-8",
              "h-8"
            )
          }
          title={ isFavorite(coin.id) ? "Unfavorite" : "favorite"}
          onClick={() => removeOrAddToFavorites(coin.id)}
        >
        {
          isFavorite(coin.id) ?
            <StarOff />
            : <Star />
        }
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="cursor-pointer rounded-full w-8 h-8"
          title={ isHidden(coin.id) ? "Select" : "Unselect"}
          onClick={() => removeOrAddToMainChart(coin.id)}
        >
        {
          isHidden(coin.id) ?
            <CirclePlus />
              : <CircleMinus />
        }
        </Button>
      </div>
    </div>
        ))}
      </div>

      <MainChart
        {
          ...{ chartData }
        }
      />
    </section>
  );
}
