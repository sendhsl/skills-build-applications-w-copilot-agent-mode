import { NavLink, Route, Routes } from 'react-router-dom'
import heroImg from './assets/hero.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navLinks = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <section className="container mt-4 text-center">
      <img src={heroImg} className="base" width="170" height="179" alt="" />
      <h1>OctoFit Tracker</h1>
      <p>Track activities, teams, and workouts, and climb the leaderboard.</p>
    </section>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} className="nav-link" to={to}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  )
}

export default App
