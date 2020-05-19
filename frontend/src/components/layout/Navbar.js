import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="white z-depth-0">
          <div className="nav-wrapper container">
            <a href="/" className="brand-logo black-text">
              $HIP
            </a>
            <a href="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="/about" className="black-text">
                  About
                </a>
              </li>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    );
  }
}
export default Navbar;
