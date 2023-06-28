import React from 'react'
import '../CSS/Navbar.css'
export default function Navbar() {
  return (
    <>
      <nav className="navbar colw fixed-top navbar-expand-lg navbar-light">
        <a className="navbar-brand lm" href="/">
          <strong>Healthify</strong>
        </a>
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item shifthead active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item shifthead ">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item shifthead active">
              <a className="nav-link" href="mailto:rblswastik@gmail.com">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
