import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createShoppingCart, LoadCart } from "../../store/shoppingCart";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();




  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="demo-button" onClick={demoLogin}>Log in as demo user</button>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
