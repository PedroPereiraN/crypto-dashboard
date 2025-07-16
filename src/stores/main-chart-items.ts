import { create } from "zustand";

export type MainChartStoreProps = {
  itemsToHide: string[];
  setItemsToHide: (newItems: string[]) => void;
};

export const useMainChartStore = create<MainChartStoreProps>()((set) => ({
  itemsToHide: [],
  setItemsToHide: (newItems: string[]) => set({ itemsToHide: newItems }),
}));
