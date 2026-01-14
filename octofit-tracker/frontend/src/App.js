import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/logo.png" alt="OctoFit Logo" width="30" height="30" className="d-inline-block align-top me-2" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="jumbotron bg-light p-4 p-md-5 rounded mb-4">
              <h1 className="display-5 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
              <p className="lead mb-3">
                Track your fitness journey with superhero teams from Marvel and DC and see how you stack up on the leaderboard.
              </p>
              <hr className="my-4" />
              <p className="mb-4">
                Use the navigation bar to explore teams, users, activities, workouts, and leaderboard data.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link className="btn btn-primary btn-lg" to="/teams" role="button">
                  View Teams
                </Link>
                <Link className="btn btn-outline-light btn-lg" to="/leaderboard" role="button">
                  View Leaderboard
                </Link>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h2 className="h5 card-title">Teams & Users</h2>
                    <p className="card-text">
                      Browse superhero teams and users to see who is driving the most progress.
                    </p>
                    <Link to="/teams" className="card-link">
                      Explore teams
                    </Link>
                    <Link to="/users" className="card-link">
                      Explore users
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h2 className="h5 card-title">Activities</h2>
                    <p className="card-text">
                      Track workouts, duration, and calories burned across the OctoFit universe.
                    </p>
                    <Link to="/activities" className="card-link">
                      View activities
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h2 className="h5 card-title">Workouts & Leaderboard</h2>
                    <p className="card-text">
                      Discover suggested workouts and see which team is leading the charge.
                    </p>
                    <Link to="/workouts" className="card-link">
                      View workouts
                    </Link>
                    <Link to="/leaderboard" className="card-link">
                      View leaderboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
