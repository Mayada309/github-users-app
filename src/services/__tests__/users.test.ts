import { getAllUsers } from '../users';
import type { User } from '../../types/user';
import { fetchData } from '../api';

jest.mock('../env', () => ({
  GITHUB_API: 'https://api.github.com/users',
}));

const GITHUB_API = 'https://api.github.com/users';

jest.mock('../api');
const mockFetchData = fetchData as jest.MockedFunction<typeof fetchData>;

describe('getAllUsers', () => {
  beforeEach(() => {
    mockFetchData.mockClear();
  });

  it('should fetch all users successfully', async () => {
    const mockUsers: User[] = [
      {
        login: 'user1',
        id: 1,
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/user1',
        repos_url: 'https://api.github.com/users/user1/repos',
        type: 'User',
      },
      {
        login: 'user2',
        id: 2,
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/user2',
        repos_url: 'https://api.github.com/users/user2/repos',
        type: 'Organization',
      },
    ];

    mockFetchData.mockResolvedValue(mockUsers);

    const result = await getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(mockFetchData).toHaveBeenCalledWith(GITHUB_API);
    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Failed to fetch users');
    mockFetchData.mockRejectedValue(mockError);

    await expect(getAllUsers()).rejects.toThrow('Failed to fetch users');
    expect(mockFetchData).toHaveBeenCalledWith(GITHUB_API);
  });

  it('should return empty array when no users are found', async () => {
    mockFetchData.mockResolvedValue([]);

    const result = await getAllUsers();

    expect(result).toEqual([]);
    expect(mockFetchData).toHaveBeenCalledWith(GITHUB_API);
  });

  it('should handle malformed user data', async () => {
    const malformedUsers: Partial<User>[] = [
      {
        login: 'user1',
        id: 1,
      },
    ];

    mockFetchData.mockResolvedValue(malformedUsers as User[]);

    const result = await getAllUsers();

    expect(result).toEqual(malformedUsers);
    expect(mockFetchData).toHaveBeenCalledWith(GITHUB_API);
  });
});
