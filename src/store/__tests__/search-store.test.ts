import { act, renderHook } from '@testing-library/react';
import { useSearchStore } from '../search-store';
import type { User } from '../../types/user';

jest.mock('../../utils/handle-search-params', () => ({
  handleSearchParam: jest.fn(),
}));

describe('search-store', () => {
  beforeEach(() => {
    act(() => {
      useSearchStore.setState({
        searchTerm: '',
        debouncedSearchTerm: '',
        isSearching: false,
      });
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useSearchStore());

    expect(result.current.searchTerm).toBe('');
    expect(result.current.debouncedSearchTerm).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('should set search term and update isSearching', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setSearchTerm('test');
    });

    expect(result.current.searchTerm).toBe('test');
    expect(result.current.isSearching).toBe(true);
  });

  it('should set isSearching to false when search term is empty', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setSearchTerm('');
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('should set debounced search term and update isSearching', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setDebouncedSearchTerm('debounced');
    });

    expect(result.current.debouncedSearchTerm).toBe('debounced');
    expect(result.current.isSearching).toBe(false);
  });

  it('should set isSearching state', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setIsSearching(true);
    });

    expect(result.current.isSearching).toBe(true);

    act(() => {
      result.current.setIsSearching(false);
    });

    expect(result.current.isSearching).toBe(false);
  });

  it('should clear search', () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setSearchTerm('test');
      result.current.setDebouncedSearchTerm('debounced');
      result.current.setIsSearching(true);
    });

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.debouncedSearchTerm).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('should filter users by login', () => {
    const { result } = renderHook(() => useSearchStore());

    const mockUsers: User[] = [
      {
        login: 'john',
        id: 1,
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/john',
        repos_url: 'https://api.github.com/users/john/repos',
        type: 'User',
      },
      {
        login: 'jane',
        id: 2,
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/jane',
        repos_url: 'https://api.github.com/users/jane/repos',
        type: 'User',
      },
      {
        login: 'bob',
        id: 3,
        avatar_url: 'https://example.com/avatar3.jpg',
        html_url: 'https://github.com/bob',
        repos_url: 'https://api.github.com/users/bob/repos',
        type: 'Organization',
      },
    ];

    act(() => {
      result.current.setDebouncedSearchTerm('jo');
    });

    const filteredUsers = result.current.filterUsers(mockUsers);

    expect(filteredUsers).toHaveLength(1);
    expect(filteredUsers[0].login).toBe('john');
  });

  it('should filter users by type', () => {
    const { result } = renderHook(() => useSearchStore());

    const mockUsers: User[] = [
      {
        login: 'john',
        id: 1,
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/john',
        repos_url: 'https://api.github.com/users/john/repos',
        type: 'User',
      },
      {
        login: 'company',
        id: 2,
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/company',
        repos_url: 'https://api.github.com/users/company/repos',
        type: 'Organization',
      },
    ];

    act(() => {
      result.current.setDebouncedSearchTerm('organization');
    });

    const filteredUsers = result.current.filterUsers(mockUsers);

    expect(filteredUsers).toHaveLength(1);
    expect(filteredUsers[0].type).toBe('Organization');
  });

  it('should return all users when no search term', () => {
    const { result } = renderHook(() => useSearchStore());

    const mockUsers: User[] = [
      {
        login: 'john',
        id: 1,
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/john',
        repos_url: 'https://api.github.com/users/john/repos',
        type: 'User',
      },
      {
        login: 'jane',
        id: 2,
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/jane',
        repos_url: 'https://api.github.com/users/jane/repos',
        type: 'User',
      },
    ];

    const filteredUsers = result.current.filterUsers(mockUsers);

    expect(filteredUsers).toEqual(mockUsers);
  });

  it('should be case insensitive when filtering', () => {
    const { result } = renderHook(() => useSearchStore());
    
    const mockUsers: User[] = [
      {
        login: 'John',
        id: 1,
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/John',
        repos_url: 'https://api.github.com/users/John/repos',
        type: 'User',
      },
    ];

    act(() => {
      result.current.setDebouncedSearchTerm('JOHN');
    });

    const filteredUsers = result.current.filterUsers(mockUsers);

    expect(filteredUsers).toHaveLength(1);
    expect(filteredUsers[0].login).toBe('John');
  });
});
