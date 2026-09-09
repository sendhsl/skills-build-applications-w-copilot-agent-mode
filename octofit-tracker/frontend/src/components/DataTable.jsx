/**
 * Generic Bootstrap-styled table for rendering an API resource collection.
 * `columns` may be provided explicitly, or derived from the keys of the
 * first item when the response shape isn't known ahead of time.
 */
function DataTable({ title, items, columns }) {
  if (!items || items.length === 0) {
    return (
      <div className="container mt-4">
        <h1>{title}</h1>
        <p>No {title.toLowerCase()} found.</p>
      </div>
    );
  }

  const resolvedColumns =
    columns ?? Object.keys(items[0]).filter((key) => key !== '__v');

  return (
    <div className="container mt-4">
      <h1>{title}</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {resolvedColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id ?? item.id ?? index}>
              {resolvedColumns.map((column) => {
                const value = item[column];
                return (
                  <td key={column}>
                    {typeof value === 'object' && value !== null
                      ? JSON.stringify(value)
                      : String(value ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
