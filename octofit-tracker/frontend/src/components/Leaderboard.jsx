import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Codespaces-aware API endpoint, with safe localhost fallback when
// VITE_CODESPACE_NAME is unset (avoids `https://undefined-8000...`).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const LEADERBOARD_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const { data: leaderboard, loading, error } = useApiData(LEADERBOARD_API_URL);

  if (loading) return <p className="container mt-4">Loading leaderboard...</p>;
  if (error) {
    return (
      <p className="container mt-4 text-danger">
        Error loading leaderboard: {error}
      </p>
    );
  }

  return <DataTable title="Leaderboard" items={leaderboard} />;
}

export default Leaderboard;
