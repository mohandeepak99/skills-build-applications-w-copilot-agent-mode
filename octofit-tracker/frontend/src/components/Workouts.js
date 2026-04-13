import React, { useEffect, useState } from 'react';

const resourceName = 'workouts';
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_ENDPOINT = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/${resourceName}/`
  : null;

function normalizeResponse(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.results)) return json.results;
  return [];
}

function formatValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function renderTable(items) {
  if (!items.length) {
    return <div className="alert alert-warning">No records available.</div>;
  }

  const columns = Object.keys(items[0] || {});
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${index}-${column}`}>{formatValue(item[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchData = () => {
    if (!API_ENDPOINT) {
      const msg = '[Workouts] Missing REACT_APP_CODESPACE_NAME';
      console.error(msg);
      setError(msg);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    console.log('[Workouts] Fetching from endpoint:', API_ENDPOINT);

    fetch(API_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log('[Workouts] fetched data:', json);
        setItems(normalizeResponse(json));
      })
      .catch((fetchError) => {
        console.error('[Workouts] fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter((item) =>
    !filterText || JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="h4 mb-1">Workouts</h2>
              <p className="text-muted mb-0">Workout sessions and plans from the Django REST API.</p>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-primary btn-sm" onClick={fetchData}>
                Refresh
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(true)}>
                View JSON
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <span className="me-2">Endpoint:</span>
            {API_ENDPOINT ? (
              <a href={API_ENDPOINT} className="link-primary" target="_blank" rel="noreferrer">
                {API_ENDPOINT}
              </a>
            ) : (
              <span className="text-danger">Not configured</span>
            )}
          </div>

          <form className="row g-2 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
            <div className="col-auto">
              <label htmlFor="workoutsFilter" className="col-form-label fw-semibold">
                Filter
              </label>
            </div>
            <div className="col-md-6 col-sm-8">
              <input
                id="workoutsFilter"
                type="text"
                className="form-control"
                placeholder="Search workouts"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading workouts...</div>}
          {!loading && !error && renderTable(filteredItems)}
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop-custom" onClick={() => setShowModal(false)} />
          <div className="modal modal-custom d-block" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workouts JSON</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <pre className="pre-json bg-light p-3 rounded">{JSON.stringify(items, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Workouts;
