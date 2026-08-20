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
            className={page === 'grades' ? 'active' : ''}
            onClick={() => setPage('grades')}
          >
            Activity 2
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
          <b className="number">2</b>
          <h2>Student Grade Evaluation</h2>
          <p>
            Enter a student's score and get an automatic remark based on grade
            ranges.
          </p>
          <button
            className="primary tile-button"
            onClick={() => setPage('grades')}
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

function GradeActivity() {
  const [studentName, setStudentName] = useState('')
  const [score, setScore] = useState('')
  const [result, setResult] = useState(null)

  function handleEvaluate() {
    if (!studentName.trim()) {
      setResult({ error: 'Please enter student name.' })
      return
    }

    const numericScore = Number(score)

    if (score === '' || numericScore < 0 || numericScore > 100) {
      setResult({ error: 'Invalid score.' })
      return
    }

    let remark = 'Failed'

    if (numericScore >= 90) remark = 'Excellent'
    else if (numericScore >= 85) remark = 'Very Good'
    else if (numericScore >= 80) remark = 'Good'
    else if (numericScore >= 75) remark = 'Passed'

    setResult({
      studentName,
      score: numericScore,
      remark,
    })
  }

  function handleClear() {
    setStudentName('')
    setScore('')
    setResult(null)
  }

  const resultClass = result?.remark?.toLowerCase().replace(' ', '-') || ''

  return (
    <main className="activity-page">
      <section className="form-card">
        <header className="card-head">
          <h1>Student Grade Evaluation</h1>
          <p>Activity 2</p>
        </header>

        <div className="card-body">
          <label className="field">
            <span>Student Name</span>
            <input
              placeholder="Enter student name"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Score</span>
            <input
              type="number"
              placeholder="Enter score (0-100)"
              value={score}
              onChange={(event) => setScore(event.target.value)}
            />
          </label>

          <div className="button-row">
            <button className="primary" onClick={handleEvaluate}>
              Evaluate
            </button>
            <button className="secondary" onClick={handleClear}>
              Clear
            </button>
          </div>

          {result?.error && <p className="result error">{result.error}</p>}

          {result?.remark && (
            <div className={`grade-result ${resultClass}`}>
              <span>Student Name</span>
              <strong>{result.studentName}</strong>
              <span>Score</span>
              <strong>{result.score}</strong>
              <span>Remarks</span>
              <b>{result.remark}</b>
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
      {page === 'grades' && <GradeActivity />}
    </div>
  )
}
