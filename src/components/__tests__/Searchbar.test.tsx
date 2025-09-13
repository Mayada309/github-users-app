import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from '../Searchbar';

const mockSetSearchTerm = jest.fn();
const mockSetDebouncedSearchTerm = jest.fn();
const mockSetIsSearching = jest.fn();
const mockClearSearch = jest.fn();

jest.mock('../../store/search-store', () => ({
  useSearchStore: jest.fn(() => ({
    searchTerm: '',
    setSearchTerm: jest.fn(),
    setDebouncedSearchTerm: jest.fn(),
    isSearching: false,
    setIsSearching: jest.fn(),
    clearSearch: jest.fn(),
  })),
}));

jest.mock('../../hooks/useDebounce', () => ({
  useDebounce: jest.fn((value) => value),
}));

import { useSearchStore } from '../../store/search-store';
const mockUseSearchStore = useSearchStore as jest.MockedFunction<
  typeof useSearchStore
>;

const mockLocation: Partial<Location> = {
  search: '',
  pathname: '/test',
};

describe('Searchbar', () => {
  beforeEach(() => {
    mockSetSearchTerm.mockClear();
    mockSetDebouncedSearchTerm.mockClear();
    mockSetIsSearching.mockClear();
    mockClearSearch.mockClear();

    mockLocation.search = '';
    mockLocation.pathname = '/test';

    mockUseSearchStore.mockReturnValue({
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      setDebouncedSearchTerm: mockSetDebouncedSearchTerm,
      isSearching: false,
      setIsSearching: mockSetIsSearching,
      clearSearch: mockClearSearch,
    });
  });

  it('should render search input', () => {
    render(<Searchbar />);

    const input = screen.getByPlaceholderText(
      'Search users by username or type...'
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
  });

  it('should call setSearchTerm when input value changes', () => {
    render(<Searchbar />);

    const input = screen.getByPlaceholderText(
      'Search users by username or type...'
    );
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('test');
  });

  it('should not show clear button when search term is empty', () => {
    render(<Searchbar />);
    const clearButton = screen.queryByTitle('Clear search');
    expect(clearButton).toBeNull();
  });

  it('should show clear button when search term is not empty', () => {
    mockUseSearchStore.mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: mockSetSearchTerm,
      setDebouncedSearchTerm: mockSetDebouncedSearchTerm,
      isSearching: false,
      setIsSearching: mockSetIsSearching,
      clearSearch: mockClearSearch,
    });

    render(<Searchbar />);
    const clearButton = screen.getByTitle('Clear search');
    expect(clearButton).toBeTruthy();
  });

  it('should call clearSearch when clear button is clicked', () => {
    mockUseSearchStore.mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: mockSetSearchTerm,
      setDebouncedSearchTerm: mockSetDebouncedSearchTerm,
      isSearching: false,
      setIsSearching: mockSetIsSearching,
      clearSearch: mockClearSearch,
    });

    render(<Searchbar />);
    const clearButton = screen.getByTitle('Clear search');
    fireEvent.click(clearButton);

    expect(mockClearSearch).toHaveBeenCalled();
  });

  it('should show loading spinner when searching', () => {
    mockUseSearchStore.mockReturnValue({
      searchTerm: 'test',
      setSearchTerm: mockSetSearchTerm,
      setDebouncedSearchTerm: mockSetDebouncedSearchTerm,
      isSearching: true,
      setIsSearching: mockSetIsSearching,
      clearSearch: mockClearSearch,
    });

    render(<Searchbar />);
    const spinner = screen
      .getByRole('textbox')
      .parentElement?.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('should initialize search term from URL params', () => {
    const originalURLSearchParams = global.URLSearchParams;
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      get: (param: string) => (param === 'search' ? 'initial' : null),
    })) as unknown as typeof URLSearchParams;

    mockLocation.search = '?search=initial';

    render(<Searchbar />);

    expect(mockSetSearchTerm).toHaveBeenCalledWith('initial');
    expect(mockSetIsSearching).toHaveBeenCalledWith(false);

    global.URLSearchParams = originalURLSearchParams;
  });

  it('should not initialize search term when no URL params', () => {
    render(<Searchbar />);
    expect(mockSetSearchTerm).not.toHaveBeenCalled();
  });

  it('should not initialize search term when URL param is empty', () => {
    const originalURLSearchParams = global.URLSearchParams;
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      get: (param: string) => (param === 'search' ? '' : null),
    })) as unknown as typeof URLSearchParams;

    mockLocation.search = '?search=';

    render(<Searchbar />);
    expect(mockSetSearchTerm).not.toHaveBeenCalled();

    global.URLSearchParams = originalURLSearchParams;
  });
});
