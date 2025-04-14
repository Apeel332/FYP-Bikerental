import React, { useState } from "react";
import "../signup/signup.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ShopReg = () => {
    const [shopname, setShopname] = useState("");
    const [address, setAddress] = useState("");
    const [ contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/shopregister", { shopname, address, contact, name, email, password })
      .then((result) => {
        console.log("Submission successful:", result);
        // Clear fields after successful submission
        console.log("Before clearing:", { shopname, address, contact, name, email, password });
        setShopname("");
        setAddress("");
        setContact("");
        setName("");
        setEmail("");
        setPassword("");
        console.log("After clearing:", { shopname, address, contact, name, email, password  });
        navigate('/addshops') 
      })
      .catch((err) => {
        console.error("Error during submission:", err);
      });
  };

  return (
    <div className="addUser">
      <h3>Shop Registration</h3>
      <form onSubmit={handleSubmit} className="addUserForm">
        <div className="inputGroup">
        <label htmlFor="shopname">Shop Name:</label>
          <input
            type="text"
            id="shopname"
            autoComplete="off"
            placeholder="Enter your valid shop name"
            value={shopname}
            onChange={(e) => setShopname(e.target.value)}
          />
          <label htmlFor="address">Shop Location:</label>
          <input
            type="text"
            id="address"
            autoComplete="off"
            placeholder="Enter your shop address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            autoComplete="off"
            placeholder="Enter your contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label htmlFor="name">Manager Name:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopReg;
