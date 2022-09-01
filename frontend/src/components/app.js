import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <div>
        <header>
          <nav>
            <Link to="/">Home</Link>
            {!token && (
              <>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<div></div>} />
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
