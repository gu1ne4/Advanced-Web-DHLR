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
          <button
            className={page === 'password' ? 'active' : ''}
            onClick={() => setPage('password')}
          >
            Activity 3
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
          Two interactive React activities demonstrating state, events,
          conditional logic, and validation.
        </p>
      </section>

      <section className="activity-grid two-cards">
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

        <article className="activity-tile">
          <b className="number">3</b>
          <h2>Password Strength Checker</h2>
          <p>
            Check password length and receive live feedback on how strong it
            is.
          </p>
          <button
            className="primary tile-button"
            onClick={() => setPage('password')}
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

function PasswordActivity() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)

  function handleCheck() {
    if (!password) {
      setResult({ error: 'Please enter a password.' })
      return
    }

    if (password.length >= 10) {
      setResult({
        status: 'Strong',
        message: 'You can use this password.',
      })
    } else if (password.length >= 6) {
      setResult({
        status: 'Medium',
        message: 'Consider creating a longer password.',
      })
    } else {
      setResult({
        status: 'Weak',
        message: 'Please create a stronger password.',
      })
    }
  }

  function handleClear() {
    setPassword('')
    setResult(null)
  }

  return (
    <main className="activity-page">
      <section className="form-card">
        <header className="card-head">
          <h1>Password Strength Checker</h1>
          <p>Activity 3</p>
        </header>

        <div className="card-body">
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <p className="counter">Character count: {password.length}</p>

          <div className="button-row">
            <button className="primary" onClick={handleCheck}>
              Check Password
            </button>
            <button className="secondary" onClick={handleClear}>
              Clear
            </button>
          </div>

          {result?.error && <p className="result error">{result.error}</p>}

          {result?.status && (
            <div className={`password-result ${result.status.toLowerCase()}`}>
              <strong>Password Status: {result.status}</strong>
              <p>{result.message}</p>
            </div>
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
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'login' && <LoginActivity />}
      {page === 'password' && <PasswordActivity />}
    </div>
  )
}
