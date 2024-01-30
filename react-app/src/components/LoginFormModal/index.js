import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton2 from "../OpenModalButton/indexV2";
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
    <div id="login-modal-wrapper">
      <h1 id="login-header" >Login</h1>
      <form id="login-form-wrapper" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} id='login-errors'>* {error}</li>
          ))}
        </ul>
        <label>
          <input
            id='login-input-box'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label>
          <input
            id='login-input-box'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <div id='submit-button-wrapper'>
        <button id="demo-login-button" onClick={demoLogin}>Demo User</button>
        <button id="login-button" type="submit">Log In</button>
        </div>
        <p id="no-account">Don't have an account? <a><OpenModalButton2
              className='register-button'
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            /> </a>here</p>
      </form>
    </div>
  );
}

export default LoginFormModal;
