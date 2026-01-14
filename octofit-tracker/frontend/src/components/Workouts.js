import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = '/api/workouts/';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
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

  const handleViewDetails = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
  };

  const filteredWorkouts = workouts.filter((workout) => {
    if (!filterText) return true;
    const search = filterText.toLowerCase();
    return (
      workout.name?.toLowerCase().includes(search) ||
      workout.description?.toLowerCase().includes(search) ||
      String(workout.suggested_for ?? '').toLowerCase().includes(search)
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
          <h1 className="h3 mb-2 mb-md-0">Workouts</h1>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="workoutsFilter" className="form-label me-2 mb-0 align-self-center">
              Filter:
            </label>
            <input
              id="workoutsFilter"
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Search by name, description, or target"
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
          {filteredWorkouts.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Suggested for</th>
                    <th scope="col">Workout ID</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>{workout.name}</td>
                      <td>{workout.description}</td>
                      <td>{workout.suggested_for}</td>
                      <td>{workout.id}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(workout)}
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
            <div className="alert alert-info mb-0">No workouts found.</div>
          )}
        </div>
      </div>

      {showModal && selectedWorkout && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {selectedWorkout.name}</p>
                  <p><strong>Description:</strong> {selectedWorkout.description}</p>
                  <p><strong>Suggested for:</strong> {selectedWorkout.suggested_for}</p>
                  <p><strong>Workout ID:</strong> {selectedWorkout.id}</p>
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

export default Workouts;