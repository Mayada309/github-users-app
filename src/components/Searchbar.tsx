import { useEffect } from 'react';
import { useSearchStore } from '../store/search-store';
import { useDebounce } from '../hooks/useDebounce';
import { Search, X } from 'lucide-react';

function Searchbar() {
  const {
    searchTerm,
    setSearchTerm,
    setDebouncedSearchTerm,
    isSearching,
    clearSearch,
    setIsSearching,
  } = useSearchStore();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setDebouncedSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setDebouncedSearchTerm]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('name');
    if (name) {
      setSearchTerm(name);
      setIsSearching(false);
    }
  }, []);

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <div className='relative mb-6'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search users by username or type...'
          className='block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        />
        {searchTerm && (
          <div className='absolute inset-y-0 right-0 flex items-center'>
            {isSearching && (
              <div className='mr-3'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'></div>
              </div>
            )}
            <button
              onClick={handleClearSearch}
              className='mr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              title='Clear search'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
