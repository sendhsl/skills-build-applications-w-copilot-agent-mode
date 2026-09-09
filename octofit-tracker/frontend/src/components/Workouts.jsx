import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Fetches from /api/workouts/
function Workouts() {
  const { data: workouts, loading, error } = useApiData('workouts');

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
