import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Codespaces-aware API endpoint, with safe localhost fallback when
// VITE_CODESPACE_NAME is unset (avoids `https://undefined-8000...`).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const TEAMS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const { data: teams, loading, error } = useApiData(TEAMS_API_URL);

  if (loading) return <p className="container mt-4">Loading teams...</p>;
  if (error) {
    return (
      <p className="container mt-4 text-danger">
        Error loading teams: {error}
      </p>
    );
  }

  return <DataTable title="Teams" items={teams} />;
}

export default Teams;
