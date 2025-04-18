import React, { useState } from "react";
// import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ShopSignup = () => {
  const [shopname, setShopname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("shopname", shopname);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image); // image file

    axios
      .post("http://localhost:3001/shopregister", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("Submission successful:", result);
        setShopname("");
        setAddress("");
        setContact("");
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);
        navigate("/bikeshops");
      })
      .catch((err) => {
        console.error("Error during submission:", err);
      });
  };

  return (
    <div className="addUser">
      <h3>Shop Registration</h3>
      <form onSubmit={handleSubmit} className="addUserForm" encType="multipart/form-data">
        <div className="inputGroup">
          <label htmlFor="shopname">Shop Name:</label>
          <input
            type="text"
            id="shopname"
            placeholder="Enter your valid shop name"
            value={shopname}
            onChange={(e) => setShopname(e.target.value)}
          />

          <label htmlFor="address">Shop Location:</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your shop address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            placeholder="Enter your contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <label htmlFor="name">Manager Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="image">Shop Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>

    </div>
  );
};

export default ShopSignup;
