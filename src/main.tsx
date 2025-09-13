import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/favorites',
    Component: Favorites,
  },
]);

const root = document.getElementById('root')!;

const FIVE_MINUTES = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: FIVE_MINUTES,
    },
  },
});

createRoot(root).render(
  <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>
);
