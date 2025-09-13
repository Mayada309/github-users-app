import { fetchData } from '../api';

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('fetchData', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };

    const mockResponse: Partial<Response> = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };

    mockFetch.mockResolvedValue(mockResponse as Response);

    const result = await fetchData('https://api.example.com/test');

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test');
    expect(mockResponse.json as jest.Mock).toHaveBeenCalled();
  });

  it('should throw error when response is not ok', async () => {
    const mockResponse: Partial<Response> = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    };

    mockFetch.mockResolvedValue(mockResponse as Response);

    await expect(fetchData('https://api.example.com/notfound')).rejects.toThrow(
      'HTTP error! status: 404'
    );
  });

  it('should throw error when response is not ok with different status', async () => {
    const mockResponse: Partial<Response> = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    };

    mockFetch.mockResolvedValue(mockResponse as Response);

    await expect(fetchData('https://api.example.com/error')).rejects.toThrow(
      'HTTP error! status: 500'
    );
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValue(networkError);

    await expect(fetchData('https://api.example.com/test')).rejects.toThrow(
      'Network error'
    );
  });

  it('should handle JSON parsing errors', async () => {
    const mockResponse: Partial<Response> = {
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
    };

    mockFetch.mockResolvedValue(mockResponse as Response);

    await expect(fetchData('https://api.example.com/test')).rejects.toThrow(
      'Invalid JSON'
    );
  });
});
