import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(formData);
      if (data.token) {
        localStorage.setItem("token", data.token); 
      }
      dispatch(setUser(data));
      navigate("/");
    } catch (error) {
      alert("Registration failed! Try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="supplier">Supplier</option>
        </select>
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
