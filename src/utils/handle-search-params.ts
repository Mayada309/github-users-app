export const handleSearchParam = (param: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get(param)) {
    return;
  }
  if (value.length === 0 || value === '' || !value || value === null) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(param);
    window.history.pushState({}, '', `${window.location.pathname}`);
  } else {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param, value);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${searchParams.toString()}`
    );
  }
};
