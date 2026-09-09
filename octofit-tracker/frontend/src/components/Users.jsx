import { useApiData } from '../hooks/useApiData';
import DataTable from './DataTable';

// Codespaces-aware API endpoint, with safe localhost fallback when
// VITE_CODESPACE_NAME is unset (avoids `https://undefined-8000...`).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const USERS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const { data: users, loading, error } = useApiData(USERS_API_URL);

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
