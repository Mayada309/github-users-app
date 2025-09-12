import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

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

createRoot(root).render(<RouterProvider router={router} />);
