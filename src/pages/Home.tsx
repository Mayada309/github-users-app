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
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading GitHub users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center max-w-md'>
          <div className='text-destructive text-5xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-foreground mb-2'>
            Error Loading Users
          </h2>
          <p className='text-muted-foreground mb-4'>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background transition-colors'>
      <div className='container mx-auto px-20 py-8 '>
        {/* Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>GitHub Users</h1>
            <p className='text-muted-foreground'>
              Discover and save your favorite GitHub users
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <NavLink
              to='/favorites'
              className='inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors'
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
          <div className='text-sm text-muted-foreground'>
            Total users: {users?.length || 0}
          </div>
        </div>

        {/* Users Display */}
        {displayedUsers.length === 0 ? (
          <div className='text-center py-16'>
            <div className='text-6xl mb-4'>🔍</div>
            <h2 className='text-2xl font-semibold text-foreground mb-2'>
              No users found
            </h2>
            <p className='text-muted-foreground'>
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
