import { WifiOff } from "lucide-react";

export function RequestError({
  whatCouldNotBeLoad,
}: {
  whatCouldNotBeLoad: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-56 gap-3">
      <WifiOff className="w-20 h-20" />
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p>Could not load your {whatCouldNotBeLoad}. Please try again later.</p>
    </div>
  );
}
