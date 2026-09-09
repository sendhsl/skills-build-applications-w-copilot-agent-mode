import { useEffect, useState } from 'react';
import { fetchJsonList } from '../config/api';

/**
 * Fetches a list from a full API `url` and keeps loading/error state.
 * Accepts both plain array and paginated ({ results: [...] }) responses via
 * `fetchJsonList`.
 */
export function useApiData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    // Defer the state reset into a microtask so setState isn't invoked
    // synchronously within the effect body itself.
    Promise.resolve()
      .then(() => {
        if (ignore) return undefined;
        setLoading(true);
        setError(null);
        return fetchJsonList(url);
      })
      .then((items) => {
        if (!ignore && items !== undefined) setData(items);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}
