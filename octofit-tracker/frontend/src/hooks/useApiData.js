import { useEffect, useState } from 'react';
import { fetchApiList } from '../config/api';

/**
 * Fetches a resource collection from the API and keeps loading/error state.
 * Accepts both plain array and paginated ({ results: [...] }) responses via
 * `fetchApiList`.
 */
export function useApiData(resource) {
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
        return fetchApiList(resource);
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
  }, [resource]);

  return { data, loading, error };
}
