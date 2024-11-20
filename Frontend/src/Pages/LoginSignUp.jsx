import { useState } from "react";
import "./Css/LoginSignup.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState(""); // Holds username or email
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleError = (message) => {
    alert(message); // Show the error in an alert box
  };

  const login = async () => {
    if (!identifier || !password) {
      handleError("Please provide a username or email and a password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier, 
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/"; 
      } else {
        handleError(data.error || "Login failed.");
      }
    } catch (err) {
      handleError("An error occurred during login.",err);
    }
  };

  const signup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      handleError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      handleError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/"; // Redirect to home page after successful signup
      } else {
        handleError(data.error || "Signup failed.");
      }
    } catch (err) {
      handleError("An error occurred during signup.",err);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className="loginsignup-container">
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <div className="input-field">
                <label htmlFor="identifier">Username or Email</label>
                <input
                  type="text"
                  id="identifier"
                  placeholder="Enter your username or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="toggle-form">
          <p onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
