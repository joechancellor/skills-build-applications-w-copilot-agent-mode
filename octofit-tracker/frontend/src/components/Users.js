import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = '/api/users/';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
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

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    if (!filterText) return true;
    const search = filterText.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      String(user.team ?? '').toLowerCase().includes(search)
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
          <h1 className="h3 mb-2 mb-md-0">Users</h1>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="usersFilter" className="form-label me-2 mb-0 align-self-center">
              Filter:
            </label>
            <input
              id="usersFilter"
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Search by name, email, or team"
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
          {filteredUsers.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Team ID</th>
                    <th scope="col">User ID</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.team}</td>
                      <td>{user.id}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(user)}
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
            <div className="alert alert-info mb-0">No users found.</div>
          )}
        </div>
      </div>

      {showModal && selectedUser && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Team ID:</strong> {selectedUser.team}</p>
                  <p><strong>User ID:</strong> {selectedUser.id}</p>
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

export default Users;