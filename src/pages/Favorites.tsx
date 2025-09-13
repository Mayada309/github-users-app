import { NavLink } from 'react-router';
import { useFavoritesStore } from '../store/favorites-store';
import { useViewStore } from '../store/view-store';
import UserGrid from '../components/UserGrid';
import UserList from '../components/UserList';
import ViewToggle from '../components/ViewToggle';
import ThemeToggle from '../components/ThemeToggle';

function Favorites() {
  const { favoritesUsers, clearFavorites } = useFavoritesStore();
  const { viewMode } = useViewStore();

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              Favorite Users
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              {favoritesUsers.length} user
              {favoritesUsers.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <NavLink
              to='/'
              className='inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
            >
              ← Back to Home
            </NavLink>
            <ThemeToggle />
          </div>
        </div>

        {/* Controls */}
        {favoritesUsers.length > 0 && (
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
            <ViewToggle />
            <button
              onClick={handleClearFavorites}
              className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
            >
              Clear All Favorites
            </button>
          </div>
        )}

        {/* Content */}
        {favoritesUsers.length === 0 ? (
          <div className='text-center py-16'>
            <div className='text-6xl mb-4'>⭐</div>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
              No favorites yet
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              Start adding users to your favorites to see them here!
            </p>
            <NavLink
              to='/'
              className='inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
            >
              Browse Users
            </NavLink>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <UserGrid users={favoritesUsers} />
            ) : (
              <UserList users={favoritesUsers} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;
