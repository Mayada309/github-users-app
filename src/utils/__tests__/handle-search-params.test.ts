import { handleSearchParam } from '../handle-search-params';


describe('handleSearchParam', () => {
  const mockWindow = Object.create(window);

  beforeAll(() => {
    Object.defineProperty(mockWindow, 'location', {
      value: {
        search: '',
      },
    });
  });

  it('should add a new search parameter', () => {
    handleSearchParam('query', 'test');
    expect(window.location.href).toEqual('http://localhost/?query=test');
  });

  it('should update an existing search parameter', () => {
    mockWindow.location.search = '?query=old';
    handleSearchParam('query', 'new');
    expect(window.location.href).toEqual('http://localhost/?query=new');
  });

  it('should remove a search parameter when value is empty', () => {
    mockWindow.location.search = '?query=test';
    handleSearchParam('query', '');
    expect(window.location.href).toEqual('http://localhost/');
  });

  it('should remove a search parameter when value is whitespace only', () => {
    mockWindow.location.search = '?query=test';
    handleSearchParam('query', '   ');
    expect(window.location.href).toEqual('http://localhost/');
  });

  it('should handle special characters in parameter values', () => {
    mockWindow.location.search = '';
    handleSearchParam('query', 'test with spaces & symbols');
    expect(window.location.href).toEqual(
      'http://localhost/?query=test+with+spaces+%26+symbols'
    );
  });
});
