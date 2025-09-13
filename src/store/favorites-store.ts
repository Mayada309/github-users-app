import { create } from 'zustand';
import type { User } from '../types/user';
import { persist } from 'zustand/middleware';

type FavoritesState = {
  favoritesUsers: User[];
};

type FavoritesActions = {
  addToFavorites: (user: User) => void;
  removeFromFavorites: (user: User) => void;
  clearFavorites: () => void;
  isFavorite: (userId: number) => boolean;
};

export type FavoritesStore = FavoritesState & FavoritesActions;

export const defaultState: FavoritesState = {
  favoritesUsers: [],
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoritesUsers: [],
      isFavorite: (userId: number) =>
        get().favoritesUsers.some((user) => user.id === userId),
      addToFavorites: (user: User) =>
        set((state) => ({ favoritesUsers: [...state.favoritesUsers, user] })),
      removeFromFavorites: (user: User) =>
        set((state) => ({
          favoritesUsers: state.favoritesUsers.filter((u) => u.id !== user.id),
        })),
      clearFavorites: () => set({ favoritesUsers: [] }),
    }),
    {
      name: 'favoritesStore',
      partialize: (state) => ({ favoritesUsers: state.favoritesUsers }),
    }
  )
);
