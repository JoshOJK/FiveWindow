import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { createShoppingCart, LoadCart } from "../../store/shoppingCart";
import OpenModalButton2 from "../OpenModalButton/indexV2";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			try {
				await dispatch(createShoppingCart())
				await dispatch(LoadCart())
			  }
			  catch (error) { console.log("SIGN_UP",error) }
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id='signup-modal-wrapper'>
			<h1 id="signup-header" >Sign Up</h1>
			<form id="signup-form-wrapper" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx} id="signup-errors">* {error}</li>
					))}
				</ul>
				<label>
					<input
						id="signup-input-box"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</label>
				<label>
					<input
						id="signup-input-box"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				<label>
					<input
						id="signup-input-box"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</label>
				<label>
					<input
						id="signup-input-box"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				<button id="signup-button" type="submit">Sign Up</button>
				<p id="returning-user">Already have an account? <a><OpenModalButton2
              buttonText="Login"
              modalComponent={<LoginFormModal />}
            /></a> here</p>
			</form>
		</div>
	);
}

export default SignupFormModal;
