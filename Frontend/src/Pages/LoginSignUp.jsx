import { useState } from "react";
import "./Css/LoginSignup.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "", // Add confirmPassword for signup form
  });

  const handleError = (message) => {
    alert(message); // Show the error in an alert box
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value, // Dynamically update the form field
    }));
  };

  const login = async () => {
    const { email, password } = formdata;
    if (!email || !password) {
      handleError("Please provide an email and password.");
      return;
    }

    console.log("Logging in with email:", email, "password:", password); // Debugging line

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Login response data:", data); // Debugging line

      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/"; // Redirect to home page after successful login
      } else {
        handleError(data.errors || "Login failed.");
      }
    } catch (err) {
      handleError("An error occurred during login.", err);
    }
  };

  const signup = async () => {
    const { username, email, password, confirmPassword } = formdata;
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
        handleError(data.errors || "Signup failed.");
      }
    } catch (err) {
      handleError("An error occurred during signup.", err);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      password: "",
      email: "",
      confirmPassword: "", // Reset confirmPassword on form switch
    });
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
                <label htmlFor="email">Username or Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your username or email"
                  value={formdata.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={handleChange}
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
                  value={formdata.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formdata.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
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
