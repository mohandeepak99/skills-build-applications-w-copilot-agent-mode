import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container py-5 app-root">
      <div className="card shadow-sm hero-card">
        <div className="card-body">
          <h1 className="display-6">Welcome to OctoFit Tracker</h1>
          <p className="lead">Track activity, join teams, and stay motivated with real-time REST API data.</p>
          <p className="text-muted">Use the navigation menu to browse activities, leaderboard, teams, users, and workouts.</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5 app-root">
      <div className="card shadow-sm hero-card">
        <div className="card-body">
          <h1 className="display-6">About OctoFit</h1>
          <p className="lead">A fitness tracker built with React consuming Django REST API endpoints.</p>
          <p className="text-muted">This frontend uses Bootstrap for responsive tables, cards, buttons, forms, and modals.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const navClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <div className="app-root">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">OctoFit Tracker</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={navClass} to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/workouts">Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/about">About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
