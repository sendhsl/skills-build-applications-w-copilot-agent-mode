import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Fetches from /api/users/
function Users() {
  const { data: users, loading, error } = useApiData('users');

  if (loading) return <p className="container mt-4">Loading users...</p>;
  if (error) {
    return (
      <p className="container mt-4 text-danger">
        Error loading users: {error}
      </p>
    );
  }

  return <DataTable title="Users" items={users} columns={['name', 'email']} />;
}

export default Users;
