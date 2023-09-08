import { useState } from "react";
import { signup } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup(name, email, password);
      setName("");
      setEmail("");
      setPassword("");

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      setError("User already exist with this email");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-container">
        <h2>Signup</h2>
        {error && <div className="error">{error}</div>}
        <div className="input">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="input">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </div>
    </form>
  );
}

export default Signup;
