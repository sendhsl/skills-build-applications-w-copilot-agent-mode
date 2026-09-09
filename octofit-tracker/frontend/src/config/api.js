// API configuration for the OctoFit logic tier.
//
// `VITE_CODESPACE_NAME` must be defined for Codespaces access, for example in
// `octofit-tracker/frontend/.env.local` (see `.env.local.example`):
//
//   VITE_CODESPACE_NAME=my-codespace-name
//
// Vite only exposes env vars prefixed with `VITE_` via `import.meta.env`.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Fall back to localhost when VITE_CODESPACE_NAME is unset, so we never build
// a broken `https://undefined-8000.app.github.dev` URL.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function buildApiUrl(resource) {
  return `${API_BASE_URL}/${resource}/`;
}

/**
 * Fetches a resource collection and normalizes the response so callers can
 * treat it as a plain array, regardless of whether the API returns a plain
 * array (`[...]`) or a paginated payload (`{ results: [...], ... }`).
 */
export async function fetchApiList(resource) {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource} (HTTP ${response.status})`);
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  return data.results ?? data.data ?? [];
}
