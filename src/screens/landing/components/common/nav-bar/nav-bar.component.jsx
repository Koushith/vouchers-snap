import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
//@ts-ignore
import Logo from "../../../assets/logo/logo.svg";
import { StyledNav } from "./nav-bar.component.styles";

export function NavBar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <StyledNav>
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src={Logo}
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={active ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={active ? "nav-menu active" : "nav-menu"}>
          <li>
            <NavLink to="/teams" className="styled-link">
              About Us
            </NavLink>
          </li>
          <li>
            {" "}
            <a href="https://safient.io" target="_next">
              {" "}
              Safient
            </a>
          </li>
        </ul>
      </nav>
    </StyledNav>
  );
}
