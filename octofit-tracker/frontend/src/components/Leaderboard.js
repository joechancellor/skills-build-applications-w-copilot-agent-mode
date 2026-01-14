import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  const apiUrl = '/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleClearFilter = () => {
    setFilterText('');
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);

  const filteredLeaderboard = sortedLeaderboard.filter((entry) => {
    if (!filterText) return true;
    const search = filterText.toLowerCase();
    return (
      String(entry.team ?? '').toLowerCase().includes(search) ||
      String(entry.points ?? '').toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center">
        <h1 className="h3 mb-2 mb-md-0">Leaderboard</h1>
        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="leaderboardFilter" className="form-label me-2 mb-0 align-self-center">
            Filter:
          </label>
          <input
            id="leaderboardFilter"
            type="text"
            className="form-control form-control-sm me-2"
            placeholder="Search by team or points"
            value={filterText}
            onChange={handleFilterChange}
          />
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        </form>
      </div>
      <div className="card-body">
        {filteredLeaderboard.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team ID</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>
                      <span
                        className={`badge ${
                          index === 0
                            ? 'bg-warning text-dark'
                            : index === 1
                            ? 'bg-secondary'
                            : index === 2
                            ? 'bg-bronze'
                            : 'bg-light text-dark'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td>Team {entry.team}</td>
                    <td>
                      <strong>{entry.points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info mb-0">No leaderboard data found.</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;