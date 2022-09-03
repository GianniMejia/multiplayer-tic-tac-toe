import { useEffect, useState } from "react";
import { CustomError } from "../utils";
import { useNavigate } from "react-router-dom";

function Signup({ token, setToken, setUser }) {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <form
        className="small-form"
        onSubmit={async (e) => {
          // Stop the page from reloading.
          e.preventDefault();

          try {
            const response = await fetch(
              process.env.REACT_APP_API_URL + "/api/auth/signup",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              }
            );

            const data = await response.json();
            if (!response.ok) {
              throw new CustomError(data.message, response.status);
            }

            // Login
            setToken(data.token);
            setUser(data.user);
            navigate("/");
          } catch (error) {
            if (error.code) {
              setError(error.message);
            } else {
              throw error;
            }
          }
        }}
      >
        <h1>Signup</h1>
        <div className="errors">{error}</div>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
