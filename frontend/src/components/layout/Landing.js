import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typist from "react-typist";

// import Wallet from "../auth/Wallet"
// import { ethers } from "ethers";

// const mainnetProvider = new ethers.providers.InfuraProvider("mainnet","beb925e5da5847928e43bef7df96bca0")
// const localProvider = new ethers.providers.InfuraProvider("rinkeby","beb925e5da5847928e43bef7df96bca0")

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      injectedProvider: null,
      address: null,
    };
  }
  /*
  <Wallet
              address={this.state.address}
              setAddress={(v) => this.setState({address: v})}
              localProvider={localProvider}
              injectedProvider= {this.state.injectedProvider}
              setInjectedProvider={(v) => this.setState({injectedProvider: v})}
              mainnetProvider={mainnetProvider}
            />*/

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12">
            <h3>
              <span>
                <Typist>
                  Build your first flash org{" "}
                  <span role="img" aria-label="lightning bolt">
                    ⚡️
                  </span>
                </Typist>
              </span>
            </h3>
            <p className="flow-text grey-text text-darken-1">
              Join the waitlist{" "}
              <span role="img" aria-label="below">
                👇
              </span>
            </p>
            <div className="col s12">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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
