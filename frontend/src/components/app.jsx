import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import { useEffect, useState } from "react";
import Home from "./home";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <BrowserRouter>
      <div>
        <header>
          <nav>
            <Link to="/">Home</Link>
            {!token ? (
              <>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setToken(null);
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home token={token} setToken={setToken} />}
            />
            <Route
              path="/signup"
              element={<Signup token={token} setToken={setToken} />}
            />
            <Route
              path="/login"
              element={<Login token={token} setToken={setToken} />}
            />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
