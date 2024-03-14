import React, {useState} from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [jokes, setJokes] = useState([])

  const fetchJokes = () => {
    fetch(
      'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10',
    )
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching jokes:', data.error)
        } else {
          setJokes(data.jokes)
        }
      })
      .catch(error => console.error('Error fetching jokes:', error))
  }

  const handleLogin = e => {
    e.preventDefault()
    if (username === 'Naveen' && password === 'Nani1234@') {
      setIsLoggedIn(true)
      fetchJokes()
    } else {
      alert('Enter Correct Details')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <h1 className="h1">Login to watch jokes</h1>
      {isLoggedIn ? (
        <div>
          <h1 className="h1">Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>Jokes:</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Joke</th>
              </tr>
            </thead>
            <tbody>
              {jokes.map((joke, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{joke}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form className="form" onSubmit={handleLogin}>
          <label className="formlabel">
            Username:
            <input
              className="forminput"
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  )
}

export default App
