import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typist from 'react-typist';
import {
  Header, Main
} from '@aragon/ui';


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      injectedProvider: null,
      address: null
    };
  }
  

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12">
          <p className="flow-text text-darken-1">
                Create your {" "} first {" "}
                <b>flash org</b> with $HIP ⚡️
          </p>
          <br />
            <div className="col s12">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable accent-3"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Landing;