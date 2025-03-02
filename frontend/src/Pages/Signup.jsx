import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Please login."); 
        navigate("/login", { replace: true });
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error("Signup failed! Please try again."); 
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login", { replace: true })}
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
        >
          Login here
        </button>
      </p>
    </div>
  );
}

export default Signup;