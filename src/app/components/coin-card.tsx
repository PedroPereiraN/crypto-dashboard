import { cn } from "@/lib/utils"
import { Star, CircleMinus, CirclePlus, StarOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CoingeckoCryptoCoinInfo } from "@/utils/types";

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


export function CoinCard(
  {
  coin,
  isFavorite,
  isHidden,
  removeOrAddToFavorites,
  removeOrAddToMainChart,
}: {
  coin: CoingeckoCryptoCoinInfo;
  isFavorite: (id: string) => boolean;
  isHidden: (id: string) => boolean;
  removeOrAddToFavorites: (id: string) => void;
  removeOrAddToMainChart: (id: string) => void;
}
) {
  return (
    <>
      <div
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
              <div
                className={cn(
                  "flex",
                  "flex-col",
                  "items-start",
                  "justify-center",
                  "gap-1",
                )}
              >
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
                  className={cn(
                    "cursor-pointer",
                    "bg-yellow-300",
                    "hover:bg-yellow-300/60",
                    "rounded-full",
                    "w-8",
                    "h-8",
                  )}
                  title={isFavorite(coin.id) ? "Unfavorite" : "favorite"}
                  onClick={() => removeOrAddToFavorites(coin.id)}
                >
                  {isFavorite(coin.id) ? <StarOff /> : <Star />}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer rounded-full w-8 h-8"
                  title={isHidden(coin.id) ? "Select" : "Unselect"}
                  onClick={() => removeOrAddToMainChart(coin.id)}
                >
                  {isHidden(coin.id) ? <CirclePlus /> : <CircleMinus />}
                </Button>
              </div>
            </div>
    </>
  )
}
