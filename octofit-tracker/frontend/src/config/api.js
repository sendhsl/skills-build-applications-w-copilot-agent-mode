// Shared helpers for building Codespaces-aware API URLs and normalizing
// list responses returned by the logic tier.
//
// `VITE_CODESPACE_NAME` must be defined for Codespaces access, for example in
// `octofit-tracker/frontend/.env.local` (see `.env.local.example`):
//
//   VITE_CODESPACE_NAME=my-codespace-name
//
// Vite only exposes env vars prefixed with `VITE_` via `import.meta.env`.

/**
 * Normalizes a list response so callers can treat it as a plain array,
 * regardless of whether the API returns a plain array (`[...]`) or a
 * paginated payload (`{ results: [...], ... }`).
 */
export function normalizeList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.results ?? data.data ?? [];
}

/**
 * Fetches a JSON list from `url` and normalizes the response via
 * `normalizeList`.
 */
export async function fetchJsonList(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (HTTP ${response.status})`);
  }

  const data = await response.json();
  return normalizeList(data);
}
