import { create } from 'zustand';
import type { User } from '../types/user';
import { handleSearchParam } from '../utils/handle-search-params';

type SearchState = {
  searchTerm: string;
  debouncedSearchTerm: string;
  isSearching: boolean;
};

type SearchActions = {
  setSearchTerm: (term: string) => void;
  setDebouncedSearchTerm: (term: string) => void;
  setIsSearching: (searching: boolean) => void;
  clearSearch: () => void;
  filterUsers: (users: User[]) => User[];
};

export type SearchStore = SearchState & SearchActions;

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchTerm: '',
  debouncedSearchTerm: '',
  isSearching: false,

  setSearchTerm: (term: string) => {
    set({ searchTerm: term, isSearching: term !== '' });
  },

  setDebouncedSearchTerm: (term: string) => {
    handleSearchParam('name', term);
    set({ debouncedSearchTerm: term, isSearching: false });
  },

  setIsSearching: (searching: boolean) => {
    set({ isSearching: searching });
  },

  clearSearch: () => {
    set({ searchTerm: '', debouncedSearchTerm: '', isSearching: false });
  },

  filterUsers: (users: User[]) => {
    const { debouncedSearchTerm } = get();
    if (!debouncedSearchTerm) return users;

    const term = debouncedSearchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.login.toLowerCase().includes(term) ||
        user.type.toLowerCase().includes(term)
    );
  },
}));
