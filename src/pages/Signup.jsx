import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");
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

    setSignupError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    setSignupError("");

    try {
      // Get existing users
      const response = await fetch(
        "http://localhost:3000/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      // Check if email already exists
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() ===
          formData.email.toLowerCase()
      );

      if (existingUser) {
        setSignupError(
          "An account with this email already exists"
        );

        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      const createResponse = await fetch(
        "http://localhost:3000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!createResponse.ok) {
        throw new Error("Failed to create account");
      }

      setIsLoading(false);

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      setSignupError(
        "Something went wrong. Please try again."
      );

      setIsLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">

        {/* Left side */}
        <div className="signup-form-section">
          <p>Create your account</p>

          <h1>Join Shopza</h1>

          <p>
            Create an account to manage your orders,
            wishlist and more.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Full name */}
            <div>
              <label>Full name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              {errors.fullName && (
                <p className="input-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label>Password</label>

              <div className="password-input">
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            {/* Confirm password */}
            <div>
              <label>Confirm password</label>

              <div className="password-input">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="input-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Signup error */}
            {signupError && (
              <p className="signup-error">
                {signupError}
              </p>
            )}

            {/* Signup button */}
            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating account..."
                : "Create account"}
            </button>

            {/* Divider */}
            <div className="signup-divider">
              <span>or</span>
            </div>

            {/* Google */}
            <button
              type="button"
              className="google-button"
            >
              <FcGoogle />
              <span>Continue with Google</span>
            </button>

            {/* Login */}
            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>

          </form>
        </div>

        {/* Right side */}
        <div className="signup-image-section">
          <h2>Everything you need, all in one place.</h2>

          <p>
            Create your Shopza account and enjoy a
            smoother shopping experience.
          </p>
        </div>

      </div>
    </main>
  );
}

export default Signup;