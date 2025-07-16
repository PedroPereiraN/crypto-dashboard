import { create } from "zustand";

export type FavoritesStoreProps = {
  favorites: string[];
  setFavorites: (newFavorites: string[]) => void;
};

export const useFavoritesStore = create<FavoritesStoreProps>()((set) => ({
  favorites: [],
  setFavorites: (newFavorites: string[]) => set({ favorites: newFavorites }),
}));
