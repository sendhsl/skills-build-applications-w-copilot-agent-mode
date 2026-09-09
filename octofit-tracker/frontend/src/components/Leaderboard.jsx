import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Fetches from /api/leaderboard/
function Leaderboard() {
  const { data: leaderboard, loading, error } = useApiData('leaderboard');

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
