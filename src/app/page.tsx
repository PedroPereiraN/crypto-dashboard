import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinsOptionsSection } from "@/components/coin-options-section";
import { FavoriteCoinsDiv } from "@/components/favorite-coins-div";

export default function Dashboard() {
  return (
    <main
      className={cn(
        "p-10",
        "bg-background",
        "flex",
        "justify-around",
        "gap-10",
        "dark",
        "text-primary",
      )}
    >
      <div>
        <CoinsOptionsSection />

        <section className="w-full">
          <h2 className={cn("text-2xl", "font-bold", "my-10")}>
            Moedas favoritadas (Max: 3)
          </h2>

          <FavoriteCoinsDiv />
        </section>
      </div>

      <section className="w-2/5 flex flex-col justify-between">
        <div className="mb-10">
          <h2 className={cn("text-2xl", "font-bold")}>
            Consulte nosso asistente virtual
          </h2>
          <p className="text-muted-foreground text-sm">
            Utilize nosso assistente virtual para analisar e encontrar
            tendências do mercado de crypto moedas
          </p>
        </div>
        <Card
          className={cn(
            "h-full",
            "bg-transparent",
            " w-full",
            " p-4",
            "flex",
            "flex-col",
            "justify-between",
          )}
        >
          <div className="flex flex-col gap-4">
            <Card className="bg-secondary border-none"></Card>
            <Card className="bg-primary border-none"></Card>
          </div>
          <div className="relative ">
            <Input className="h-10" />
            <Button
              variant="secondary"
              size="icon"
              className="size-6 absolute right-4 top-2"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
