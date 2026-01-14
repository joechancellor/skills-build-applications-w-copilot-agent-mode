import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = '/api/teams/';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
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

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  const filteredTeams = teams.filter((team) => {
    if (!filterText) return true;
    const search = filterText.toLowerCase();
    return (
      team.name?.toLowerCase().includes(search) ||
      team.description?.toLowerCase().includes(search) ||
      String(team.id ?? '').toLowerCase().includes(search)
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
    <>
      <div className="card shadow-sm">
        <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <h1 className="h3 mb-2 mb-md-0">Teams</h1>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="teamsFilter" className="form-label me-2 mb-0 align-self-center">
              Filter:
            </label>
            <input
              id="teamsFilter"
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Search by name or description"
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
          {filteredTeams.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Team</th>
                    <th scope="col">Description</th>
                    <th scope="col">Team ID</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team) => (
                    <tr key={team.id}>
                      <td>
                        <span className={`badge ${team.name === 'Marvel' ? 'bg-danger' : 'bg-primary'} me-2`}>
                          {team.name}
                        </span>
                      </td>
                      <td>{team.description}</td>
                      <td>{team.id}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(team)}
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info mb-0">No teams found.</div>
          )}
        </div>
      </div>

      {showModal && selectedTeam && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Team details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Team:</strong>{' '}
                    <span className={`badge ${selectedTeam.name === 'Marvel' ? 'bg-danger' : 'bg-primary'} me-2`}>
                      {selectedTeam.name}
                    </span>
                  </p>
                  <p><strong>Description:</strong> {selectedTeam.description}</p>
                  <p><strong>Team ID:</strong> {selectedTeam.id}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default Teams;