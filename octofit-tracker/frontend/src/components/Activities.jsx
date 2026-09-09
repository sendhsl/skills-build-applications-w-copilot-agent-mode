import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Codespaces-aware API endpoint, with safe localhost fallback when
// VITE_CODESPACE_NAME is unset (avoids `https://undefined-8000...`).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const ACTIVITIES_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const { data: activities, loading, error } = useApiData(ACTIVITIES_API_URL);

  if (loading) return <p className="container mt-4">Loading activities...</p>;
  if (error) {
    return (
      <p className="container mt-4 text-danger">
        Error loading activities: {error}
      </p>
    );
  }

  return (
    <DataTable
      title="Activities"
      items={activities}
      columns={['type', 'durationMinutes', 'date', 'user']}
    />
  );
}

export default Activities;
