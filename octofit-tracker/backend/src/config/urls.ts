const codespaceName = process.env.CODESPACE_NAME;

/**
 * Builds the publicly reachable base URL for the given forwarded port.
 * In a GitHub Codespace, ports are exposed at `https://$CODESPACE_NAME-<port>.app.github.dev`.
 * Falls back to `http://localhost:<port>` when CODESPACE_NAME is not set.
 */
export function buildBaseUrl(port: number): string {
  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
}

export const apiPort = 8000;
export const frontendPort = 5173;
export const apiBaseUrl = buildBaseUrl(apiPort);
export const frontendOrigin = buildBaseUrl(frontendPort);
