import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { FaTwitter, FaGithub } from "react-icons/fa";

class Footer extends Component {
  render() {
    return (
      <div className="page-footer white">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="black-text">Follow us</h5>
                <li
                  className="btn-floating waves-effect waves-light hoverable black accent-3"
                  style={{ margin: "5px" }}
                >
                  {" "}
                  <i className="material-icons">code</i>
                </li>
                <li
                  className="btn-floating waves-effect waves-light hoverable blue accent-3"
                  style={{ margin: "5px" }}
                >
                  {" "}
                  <i className="material-icons">forum</i>
                </li>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
