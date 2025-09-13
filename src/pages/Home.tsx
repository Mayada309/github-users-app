import { useEffect } from 'react';
import { NavLink } from 'react-router';
import Searchbar from '../components/Searchbar';
import UserGrid from '../components/UserGrid';
import UserList from '../components/UserList';
import ViewToggle from '../components/ViewToggle';
import ThemeToggle from '../components/ThemeToggle';
import InfiniteScrollLoader from '../components/InfiniteScrollLoader';
import { useUsers } from '../hooks/useUsers';
import { useInfiniteScrollStore } from '../store/infinite-scroll-store';
import { useSearchStore } from '../store/search-store';
import { useViewStore } from '../store/view-store';
import { useFavoritesStore } from '../store/favorites-store';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function Home() {
  const { data: users, isLoading, error } = useUsers();
  const {
    setAllUsers,
    setFilteredUsers,
    getDisplayedUsers,
    loadMoreUsers,
    hasMore,
    isLoading: isLoadingMore,
  } = useInfiniteScrollStore();
  const { filterUsers, debouncedSearchTerm } = useSearchStore();
  const { viewMode } = useViewStore();
  const { favoritesUsers } = useFavoritesStore();

  useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: loadMoreUsers,
  });

  useEffect(() => {
    if (users) {
      setAllUsers(users);
    }
  }, [users, setAllUsers]);

  useEffect(() => {
    if (users) {
      const filtered = filterUsers(users);
      setFilteredUsers(filtered);
    }
  }, [users, debouncedSearchTerm, filterUsers, setFilteredUsers]);

  const displayedUsers = getDisplayedUsers();

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>
            Loading GitHub users...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center max-w-md'>
          <div className='text-red-500 text-5xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
            Error Loading Users
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              GitHub Users
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              Discover and save your favorite GitHub users
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <NavLink
              to='/favorites'
              className='inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'
            >
              ⭐ Favorites ({favoritesUsers.length})
            </NavLink>
            <ThemeToggle />
          </div>
        </div>

        {/* Search */}
        <Searchbar />

        {/* Controls */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
          <ViewToggle />
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            Total users: {users?.length || 0}
          </div>
        </div>

        {/* Users Display */}
        {displayedUsers.length === 0 ? (
          <div className='text-center py-16'>
            <div className='text-6xl mb-4'>🔍</div>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
              No users found
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <UserGrid users={displayedUsers} />
            ) : (
              <UserList users={displayedUsers} />
            )}

            {/* Infinite Scroll Loader */}
            <InfiniteScrollLoader
              isLoading={isLoadingMore}
              hasMore={hasMore}
              onLoadMore={loadMoreUsers}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
