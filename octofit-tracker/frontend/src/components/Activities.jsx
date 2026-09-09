import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Fetches from /api/activities/
function Activities() {
  const { data: activities, loading, error } = useApiData('activities');

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
