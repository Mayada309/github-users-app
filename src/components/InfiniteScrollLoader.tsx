interface InfiniteScrollLoaderProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore?: () => void;
}

function InfiniteScrollLoader({
  isLoading,
  hasMore,
  onLoadMore,
}: InfiniteScrollLoaderProps) {
  if (!hasMore) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500 dark:text-gray-400'>
          You've reached the end of the list
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='text-center py-8'>
        <div className='inline-flex items-center space-x-2'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
          <span className='text-gray-600 dark:text-gray-400'>
            Loading more users...
          </span>
        </div>
      </div>
    );
  }

  if (onLoadMore) {
    return (
      <div className='text-center py-8'>
        <button
          onClick={onLoadMore}
          className='px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
        >
          Load More Users
        </button>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
          Or scroll down to load automatically
        </p>
      </div>
    );
  }

  return null;
}

export default InfiniteScrollLoader;
