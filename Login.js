import "./App.css";
import { Link,useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🌿 Wellness Chatbot</h1>
        <p>Your AI Wellness Assistant</p>

        <input
          type="email"
          placeholder="Enter your Email"
        />

        <input
          type="password"
          placeholder="Enter your Password"
        />

        <button onClick={() => navigate("/dashboard")}>
         Login
</button>

       <p className="signup-text">
  Don't have an account? <Link to="/signup">Sign Up</Link>
</p>
      </div>
    </div>
  );
}

export default Login;