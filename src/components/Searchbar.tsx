import { useEffect } from 'react';
import { useSearchStore } from '../store/search-store';
import { useDebounce } from '../hooks/useDebounce';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';

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
    const name = searchParams.get('search');
    if (name) {
      setSearchTerm(name);
      setIsSearching(false);
    }
  }, [setSearchTerm, setIsSearching]);

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <div className='relative mb-6'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-muted-foreground' />
        </div>
        <Input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search users by username or type...'
          className='w-full  pl-10 pr-12 py-3 text-base border border-border rounded-full leading-5  text-foreground placeholder-muted-foreground'
        />
        {searchTerm && (
          <div className='absolute inset-y-0 right-0 flex items-center'>
            {isSearching && (
              <div className='mr-3'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-primary'></div>
              </div>
            )}
            <button
              onClick={handleClearSearch}
              className='mr-3 text-muted-foreground hover:text-foreground'
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
