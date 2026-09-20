import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch(
        "https://shopza-4wb7.onrender.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      const user = users.find(
        (user) =>
          user.email.toLowerCase() ===
            formData.email.toLowerCase() &&
          user.password === formData.password
      );

      if (!user) {
        setLoginError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      const loggedInUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      };

      if (rememberMe) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );
      } else {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );
      }

      setIsLoading(false);

      navigate("/");
    } catch (error) {
      console.error(error);

      setLoginError(
        "Something went wrong. Please try again."
      );

      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <p>Welcome back</p>

          <h1>Login to your account</h1>

          <p>
            Access your orders, wishlist and more.
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Email address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />

              {errors.email && (
                <p className="input-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="password-field">
              <label>Password</label>

              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="input-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />
                Remember me
              </label>

              <button type="button">
                Forgot password?
              </button>
            </div>

            {loginError && (
              <p className="login-error">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="login-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="google-button"
            >
              <FcGoogle />
              <span>Continue with Google</span>
            </button>

            <p className="signup-text">
              Don't have an account?{" "}
              <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>

        <div className="login-image-section">
          <img
            src="/images/login/login-image.png"
            alt="Shopza shopping experience"
          />

          <div className="login-image-content">
            <h2>Better style, brighter days</h2>

            <p>
              Log in to get the best deals, track your orders
              and enjoy a smoother shopping experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

