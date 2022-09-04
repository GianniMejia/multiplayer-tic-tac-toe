import { useEffect, useState } from "react";
import { CustomError } from "../utils";
import { useNavigate } from "react-router-dom";

function Home({ token, setToken }) {
  const [error, setError] = useState(null);
  const [opponentUsername, setOpponetUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);
  const navigate = useNavigate();

  // Get the leaderboard
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/api/user/leaderboard",
          {
            method: "GET",
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new CustomError(data.message, response.status);
        }

        setLeaderboard(data);
      } catch (error) {
        if (error.code) {
          setError(error.message);
        } else {
          throw error;
        }
      }
    })();
  }, []);

  return (
    <>
      <h1>Multiplayer Tic Tac Toe</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!token) {
            navigate(`/login`);
          }

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

            navigate(`/match/${data.match._id}`);
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
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>W/L</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard &&
            leaderboard.map((user) => (
              <tr>
                <td>{user.username}</td>
                <td>{user.wins}</td>
                <td>{user.losses}</td>
                <td>{user.winLossRatio !== null && `${user.winLossRatio}%`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
