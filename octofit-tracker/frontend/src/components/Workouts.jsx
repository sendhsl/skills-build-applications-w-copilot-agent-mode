import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Codespaces-aware API endpoint, with safe localhost fallback when
// VITE_CODESPACE_NAME is unset (avoids `https://undefined-8000...`).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const WORKOUTS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const { data: workouts, loading, error } = useApiData(WORKOUTS_API_URL);

  if (loading) return <p className="container mt-4">Loading workouts...</p>;
  if (error) {
    return (
      <p className="container mt-4 text-danger">
        Error loading workouts: {error}
      </p>
    );
  }

  return <DataTable title="Workouts" items={workouts} />;
}

export default Workouts;
