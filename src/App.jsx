import { useState } from 'react'
import './App.css'

function Header({ page, setPage }) {
  return (
    <header className="topbar">
      <nav className="nav-wrap">
        <button className="brand" onClick={() => setPage('home')}>
          <span>R</span>
          React Activity Portal
        </button>

        <div className="nav-links">
          <button
            className={page === 'home' ? 'active' : ''}
            onClick={() => setPage('home')}
          >
            Home
          </button>
          <button
            className={page === 'login' ? 'active' : ''}
            onClick={() => setPage('login')}
          >
            Activity 1
          </button>
        </div>
      </nav>
    </header>
  )
}

function Home({ setPage }) {
  return (
    <main className="home">
      <section className="intro">
        <h1>React Activity Portal</h1>
        <p>
          An interactive React activity demonstrating state, events,
          conditional logic, and validation.
        </p>
      </section>

      <section className="activity-grid single-card">
        <article className="activity-tile">
          <b className="number">1</b>
          <h2>Login Authentication</h2>
          <p>
            Validate a username and password against sample credentials and
            manage login/logout state.
          </p>
          <button
            className="primary tile-button"
            onClick={() => setPage('login')}
          >
            Open Activity
          </button>
        </article>
      </section>
    </main>
  )
}

function LoginActivity() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  function handleLogin() {
    if (!username && !password) {
      setMessage('Please enter username and password.')
      return
    }

    if (username === 'admin' && password === '12345') {
      setLoggedIn(true)
      setMessage('')
      return
    }

    setMessage('Invalid username or password.')
  }

  function handleLogout() {
    setUsername('')
    setPassword('')
    setMessage('')
    setLoggedIn(false)
  }

  return (
    <main className="activity-page">
      <section className="form-card">
        <header className="card-head">
          <h1>Login Authentication</h1>
          <p>Activity 1</p>
        </header>

        <div className="card-body">
          {loggedIn ? (
            <div className="login-success">
              <div className="check-icon">✓</div>
              <p className="success-message">Login successful!</p>
              <div className="welcome-box">
                <span>Welcome back,</span>
                <strong>{username}</strong>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <label className="field">
                <span>Username</span>
                <input
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <button className="primary full" onClick={handleLogin}>
                Login
              </button>

              {message && <p className="result error">{message}</p>}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app">
      <Header page={page} setPage={setPage} />
      {page === 'home' ? <Home setPage={setPage} /> : <LoginActivity />}
    </div>
  )
}
