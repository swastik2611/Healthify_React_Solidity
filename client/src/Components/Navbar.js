import React from 'react'
import '../CSS/Navbar.css'
export default function Navbar() {
  return (
    <>
      <nav className="navbar colw navbar-expand-lg navbar-light">
        <span className="navbar-brand lm navtxt">
          <strong>Healthify</strong>
        </span>
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
              <a className="nav-link navtxt" href="/">
                Home
              </a>
            </li>
            <li className="nav-item shifthead ">
              <a className="nav-link navtxt" href="/doctorsignin">
                Doctor
              </a>
            </li>
            <li className="nav-item shifthead ">
              <a className="nav-link navtxt" href="/patientsignin">
                Patient
              </a>
            </li>
            <li className="nav-item shifthead active">
              <a className="nav-link navtxt" href="mailto:rblswastik@gmail.com">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
