import { useEffect, useState } from "react";
import { CustomError } from "../utils";
import { useNavigate } from "react-router-dom";

function Home({ token, setToken }) {
  const [error, setError] = useState("");
  const [opponentUsername, setOpponetUsername] = useState("");
  // const navigate = useNavigate();

  return (
    token && (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          try {
            const response = await fetch(
              process.env.REACT_APP_API_URL + "/api/match",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  opponentUsername: opponentUsername,
                }),
              }
            );

            const data = await response.json();
            if (!response.ok) {
              throw new CustomError(data.message, response.status);
            }

            // navigate("/");
          } catch (error) {
            if (error.code) {
              setError(error.message);
            } else {
              throw error;
            }
          }
        }}
      >
        <div>{error}</div>
        <input
          value={opponentUsername}
          onChange={(e) => setOpponetUsername(e.target.value)}
          placeholder="username..."
        />
        <button>Challenge</button>
      </form>
    )
  );
}

export default Home;
