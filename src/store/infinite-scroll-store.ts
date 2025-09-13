import { create } from 'zustand';
import type { User } from '../types/user';

type InfiniteScrollState = {
  displayedUsers: User[];
  filteredUsers: User[];
  allUsers: User[];
  itemsPerPage: number;
  hasMore: boolean;
  isLoading: boolean;
};

type InfiniteScrollActions = {
  setAllUsers: (users: User[]) => void;
  setFilteredUsers: (users: User[]) => void;
  loadMoreUsers: () => void;
  setIsLoading: (loading: boolean) => void;
  getDisplayedUsers: () => User[];
};

export type InfiniteScrollStore = InfiniteScrollState & InfiniteScrollActions;

export const useInfiniteScrollStore = create<InfiniteScrollStore>(
  (set, get) => ({
    displayedUsers: [],
    filteredUsers: [],
    allUsers: [],
    itemsPerPage: 5,
    hasMore: true,
    isLoading: false,

    setAllUsers: (users: User[]) => {
      set({
        allUsers: users,
        filteredUsers: users,
        displayedUsers: users.slice(0, 5),
        hasMore: users.length > 5,
      });
    },

    setFilteredUsers: (users: User[]) => {
      set({
        filteredUsers: users,
        displayedUsers: users.slice(0, 5),
        hasMore: users.length > 5,
      });
    },

    loadMoreUsers: () => {
      const { displayedUsers, filteredUsers, itemsPerPage, isLoading } = get();

      if (isLoading) return;

      set({ isLoading: true });

      setTimeout(() => {
        const currentCount = displayedUsers.length;
        const nextBatch = filteredUsers.slice(
          currentCount,
          currentCount + itemsPerPage
        );

        set((state) => ({
          displayedUsers: [...state.displayedUsers, ...nextBatch],
          hasMore: currentCount + nextBatch.length < filteredUsers.length,
          isLoading: false,
        }));
      }, 300);
    },

    setIsLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },

    getDisplayedUsers: () => {
      return get().displayedUsers;
    },
  })
);
