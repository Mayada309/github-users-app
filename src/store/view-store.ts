import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'grid' | 'list';

type ViewState = {
  viewMode: ViewMode;
};

type ViewActions = {
  setViewMode: (mode: ViewMode) => void;
};

export type ViewStore = ViewState & ViewActions;

export const useViewStore = create<ViewStore>()(
  persist(
    (set) => ({
      viewMode: 'grid',

      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode });
      },
    }),
    {
      name: 'viewStore',
      partialize: (state) => ({ viewMode: state.viewMode }),
    }
  )
);
