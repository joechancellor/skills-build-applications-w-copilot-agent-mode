import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = '/api/activities/';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
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

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  const filteredActivities = activities.filter((activity) => {
    if (!filterText) return true;
    const search = filterText.toLowerCase();
    return (
      activity.type?.toLowerCase().includes(search) ||
      String(activity.user ?? '').toLowerCase().includes(search) ||
      String(activity.date ?? '').toLowerCase().includes(search)
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
          <h1 className="h3 mb-2 mb-md-0">Activities</h1>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="activitiesFilter" className="form-label me-2 mb-0 align-self-center">
              Filter:
            </label>
            <input
              id="activitiesFilter"
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Search by type, user, or date"
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
          {filteredActivities.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Duration (min)</th>
                    <th scope="col">Calories</th>
                    <th scope="col">Date</th>
                    <th scope="col">User ID</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.type}</td>
                      <td>{activity.duration}</td>
                      <td>{activity.calories}</td>
                      <td>{activity.date}</td>
                      <td>{activity.user}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(activity)}
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
            <div className="alert alert-info mb-0">No activities found.</div>
          )}
        </div>
      </div>

      {showModal && selectedActivity && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Type:</strong> {selectedActivity.type}</p>
                  <p><strong>Duration:</strong> {selectedActivity.duration} minutes</p>
                  <p><strong>Calories:</strong> {selectedActivity.calories}</p>
                  <p><strong>Date:</strong> {selectedActivity.date}</p>
                  <p><strong>User ID:</strong> {selectedActivity.user}</p>
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

export default Activities;