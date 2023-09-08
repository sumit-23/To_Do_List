import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../api/Api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      console.log("login");
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}
        <div className="input">
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
