import React, { useState } from "react";
import "@picocss/pico/css/pico.min.css";
import { useAuthStore } from "../../store/authStore";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {}
  };

  return (
    <main>
      <article
        className="card"
        style={{ maxWidth: "500px", margin: "auto", padding: "1.5rem" }}
      >
        <header>
          <h2>Log In </h2>
        </header>

        <form onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor="email">
              Email
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email here...."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password here...."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={isLoading}
            aria-label={isLoading ? "Please wait…" : null}
            style={{
              backgroundColor: "var(--primary-green)",
              borderColor: "var(--primary-green)",
            }}
          >
            {isLoading ? "" : "Log in"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <footer>
          <p>
            Don't have an account? <a href="/register">Signup here</a>
          </p>
        </footer>
      </article>
    </main>
  );
};

export default login;
