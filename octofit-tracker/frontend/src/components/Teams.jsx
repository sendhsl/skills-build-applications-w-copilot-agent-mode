import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Fetches from /api/teams/
function Teams() {
  const { data: teams, loading, error } = useApiData('teams');

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
