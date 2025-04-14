import React, {useState} from "react";
import "./login.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", {email, password })
      .then((result) => {
        if(result.data.Status === "Success") {
          if(result.data.role !== "user") {
            navigate('/admin')
          } else {
            navigate('/home')
          }
     

        } else{
          alert("Invalid username or password");
          console.log("Clearing Fields");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => console.log(err));
    }
  return (
    <div className="addUser">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit} className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <button type="submit" className="btn btn-primary">
            Login
            </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have Account ?</p>
        <Link to="/register" type="submit" className="btn btn-success">
          Sign up
          </Link>
      </div>
    </div>
  );
};

export default Login;
