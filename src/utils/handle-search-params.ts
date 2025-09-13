export const handleSearchParam = (param: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const valueIsEmpty = !value || value.trim() === '';

  if (valueIsEmpty) {
    searchParams.delete(param);
    const newSearch = searchParams.toString();
    const newUrl = newSearch
      ? `${window.location.pathname}?${newSearch}`
      : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  } else {
    searchParams.set(param, value);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${searchParams.toString()}`
    );
  }
};
