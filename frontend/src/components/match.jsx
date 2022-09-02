import { useEffect, useState } from "react";
import { CustomError } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import css from "../css/match.module.css";

function Match({ token, setToken }) {
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
      (async () => {
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
      })();
    }
  }, []);

  return (
    token &&
    match && (
      <form className={css.gameBoard}>
        <button disabled={match.board[0][0]}>{match.board[0][0]}</button>
        <button disabled={match.board[0][0]}>{match.board[0][1]}</button>
        <button disabled={match.board[0][0]}>{match.board[0][2]}</button>
        <button disabled={match.board[0][0]}>{match.board[1][0]}</button>
        <button disabled={match.board[0][0]}>{match.board[1][1]}</button>
        <button disabled={match.board[0][0]}>{match.board[1][2]}</button>
        <button disabled={match.board[0][0]}>{match.board[2][0]}</button>
        <button disabled={match.board[0][0]}>{match.board[2][1]}</button>
        <button disabled={match.board[0][0]}>{match.board[2][2]}</button>
      </form>
    )
  );
}

export default Match;
