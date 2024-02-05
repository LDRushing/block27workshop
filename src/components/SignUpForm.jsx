import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
          }
        );
        const result = await response.json();
        setToken(result.token);
        console.log(result);
        setSuccessMessage(result.message);
      } catch (error) {
        setError(error.message);
      }
    }
    function formValidation() {
      //Form validation!
      let message = "";
      if (!username) {
        message += "Please enter a username. ";
      } else if (username.length > 8) {
        message += "Username must be at least 8 characters long. ";
      }
      if (message) {
        setError(message);
        return false;
      } else {
        setError(null);
        return true;
      }
    }
  }
  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label for="username">
          Username (8 characters):{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {username.length !== 8 && (
          <p style={{ color: "red" }}>Username must be 8 characters long.</p>
        )}
        <label for="password">
          Password (8 characters):{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
