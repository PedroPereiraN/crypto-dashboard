"use client";

import { useCoinsSection } from "@/hooks/coins-section";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestError } from "@/components/request-error";
import { CoingeckoCryptoCoinInfo } from "@/utils/types";
import { CoinCard } from "./coin-card";

export function CoinsList() {
  const { coinsQuery, mainChartStore, favoriteStore } = useCoinsSection();

  const { isPending, data, error } = coinsQuery;

  const removeOrAddToMainChart = (id: string) => {
    const isHidden = mainChartStore.itemsToHide.includes(id.toLowerCase());
    if (isHidden) {
      mainChartStore.setItemsToHide(
        mainChartStore.itemsToHide.filter(
          (item: string) => !(item == id.toLowerCase()),
        ),
      );
    } else {
      mainChartStore.setItemsToHide([
        ...mainChartStore.itemsToHide,
        id.toLowerCase(),
      ]);
    }
  };

  const removeOrAddToFavorites = (id: string) => {
    const isFavorite = favoriteStore.favorites.includes(id.toLowerCase());
    if (isFavorite) {
      favoriteStore.setFavorites(
        favoriteStore.favorites.filter(
          (item: string) => !(item == id.toLowerCase()),
        ),
      );
    } else if (!isFavorite && favoriteStore.favorites.length <= 2) {
      favoriteStore.setFavorites([
        ...favoriteStore.favorites,
        id.toLowerCase(),
      ]);
    } else if (favoriteStore.favorites.length > 2) {
      toast("Limit reached", {
        description: "The favorites limit is 3.",
      });
    }
  };

  const isFavorite = (coinId: string) =>
    !!favoriteStore.favorites.includes(coinId.toLowerCase());
  const isHidden = (coinId: string) =>
    !!mainChartStore.itemsToHide.includes(coinId.toLowerCase());

  return (
    <>
      {isPending ? (
        <div
          className={cn(
            "flex",
            "flex-wrap",
            "gap-2",
            "items-center",
            "justify-center md:justify-start",
            "my-10",
            "relative",
          )}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn("p-4", "w-52", "h-20", "rounded-lg")}
            />
          ))}
        </div>
      ) : error ? (
        <RequestError {...{ whatCouldNotBeLoad: "cryptocurrencies" }} />
      ) : (
        <div
          className={cn(
            "flex",
            "flex-wrap",
            "gap-2",
            "items-center",
            "justify-center md:justify-start",
            "my-10",
            "relative",
          )}
        >
          {data?.map((coin: CoingeckoCryptoCoinInfo, index: number) => (
            <CoinCard
              key={index}
              {...{
                coin,
                isFavorite,
                isHidden,
                removeOrAddToFavorites,
                removeOrAddToMainChart,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
