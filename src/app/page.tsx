import { cn } from "@/lib/utils";
import { CoinsList } from "./components/coins-list";
import { FavoriteCoins } from "./components/favorite-coins";
import { MainChartLoader } from "./components/main-chart-loader";
import { ChatbotContent } from "./components/chatbot-content";

export default function Dashboard() {
  return (
    <main
      className={cn(
        "p-4 md:p-10",
        "bg-background",
        "flex",
        "flex-col lg:flex-row",
        "justify-around",
        "gap-10",
        "text-primary",
        "h-fit",
      )}
    >
      <div className="md:w-4/5">
        <section>
          <h1
            className={cn("text-3xl", "font-bold", "text-center md:text-start")}
          >
            Cryptocurrencies
          </h1>
          <CoinsList />

          <MainChartLoader />
        </section>

        <section className="w-full">
          <h2 className={cn("text-2xl", "font-bold", "my-10")}>
            Favorite cryptocurrencies (Max: 3)
          </h2>

          <FavoriteCoins />
        </section>
      </div>

      <section className="lg:w-3/5 flex flex-col h-full relative">
        <div className="mb-10">
          <h2 className={cn("text-2xl", "font-bold")}>
            Consult our virtual assistant
          </h2>
          <p className="text-muted-foreground text-sm">
            Use our virtual assistant to analyze and identify cryptocurrency
            market trends
          </p>
        </div>
        <ChatbotContent />
      </section>
    </main>
  );
}
