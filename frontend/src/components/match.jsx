import { useEffect, useState } from "react";
import { CustomError } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import css from "../css/match.module.css";

function Match({ token, setToken, user }) {
  const [error, setError] = useState(null);
  const [match, setMatch] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      const getBoardState = async () => {
        try {
          const response = await fetch(
            process.env.REACT_APP_API_URL + `/api/match/${id}`,
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

          setMatch(data.match);
        } catch (error) {
          if (error.code) {
            setError(error.message);
          } else {
            throw error;
          }
        }
      };

      getBoardState();

      setInterval(getBoardState, 2000);
    }
  }, []);

  const attemptMove = async (y, x) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/match/${match._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            x: x,
            y: y,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new CustomError(data.message, response.status);
      }

      setMatch(data.match);
    } catch (error) {
      if (error.code) {
        setError(error.message);
      } else {
        throw error;
      }
    }
  };

  const board = match && JSON.parse(match.board);

  return (
    token &&
    match &&
    user && (
      <div>
        <div>
          {match.winner &&
            (match.winner == user._id ? (
              <span>You Win!</span>
            ) : (
              <span>You Lose!</span>
            ))}
        </div>
        <div>
          <em>NOTE: Send this link to your opponent...</em>
        </div>
        <div>
          <input type="text" disabled value={window.location.href} />
        </div>
        <div>{error}</div>
        <div className={css.gameBoard}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <button
                disabled={board[y][x]}
                onClick={() => {
                  attemptMove(y, x);
                }}
              >
                {board[y][x]}
              </button>
            ))
          )}
        </div>
      </div>
    )
  );
}

export default Match;
