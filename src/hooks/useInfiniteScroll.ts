import { useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 200,
}: UseInfiniteScrollOptions) {
  const throttleRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    if (throttleRef.current) return;

    throttleRef.current = window.setTimeout(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - threshold) {
        onLoadMore();
      }

      throttleRef.current = null;
    }, 100);
  }, [hasMore, isLoading, onLoadMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleRef.current) {
        window.clearTimeout(throttleRef.current);
      }
    };
  }, [handleScroll]);
}
