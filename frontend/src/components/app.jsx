import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import { useEffect, useState } from "react";
import Home from "./home";
import Match from "./match";
import { CustomError } from "../utils";
import theme from "../css/theme.module.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (token) {
        localStorage.setItem("token", token);

        const response = await fetch(
          process.env.REACT_APP_API_URL + "/api/auth/current-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new CustomError(data.message, response.status);
        }

        setUser(data);
      } else {
        localStorage.removeItem("token");
      }
    })();
  }, [token]);

  return (
    <BrowserRouter>
      <div className={theme.main}>
        <header>
          <nav>
            <Link to="/">Home</Link>

            <span className={theme.spacer}></span>
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
              element={
                <Signup token={token} setToken={setToken} setUser={setUser} />
              }
            />
            <Route
              path="/login"
              element={
                <Login token={token} setToken={setToken} setUser={setUser} />
              }
            />
            <Route
              path="/match/:id"
              element={<Match token={token} setToken={setToken} user={user} />}
            />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
