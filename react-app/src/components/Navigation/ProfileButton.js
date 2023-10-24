import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button id="open-modal-butt" onClick={openMenu}>
      <span class="material-symbols-outlined" id="profile-button">account_circle</span>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="profile-info">
            <li id="users-username">{user.username}</li>
            <li id="logout-button-wrapper">
              <button onClick={handleLogout} id="logout-button">Log Out<span class="material-symbols-outlined">logout</span></button>
            </li>
          </div>
        ) : (
          <div id='login-signup-dropdown'>
            <OpenModalButton
              buttonText='Log in'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <div id="signup">
            <OpenModalButton
              id='sign-up'
              buttonText="Sign up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
