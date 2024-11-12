import { useState } from "react";
import './Css/LoginSignup.css'

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="loginsignup-container">
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form>
          {isLogin ? (
            <>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />
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
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />
              </div>

              <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
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
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
