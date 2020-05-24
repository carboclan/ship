import React from 'react'
import Wallet from "../auth/Wallet"
import { ethers } from "ethers";
import styled from 'styled-components'
import GitHubLogin from 'github-login';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

const mainnetProvider = new ethers.providers.InfuraProvider("mainnet", "beb925e5da5847928e43bef7df96bca0")
const localProvider = new ethers.providers.InfuraProvider("rinkeby", "beb925e5da5847928e43bef7df96bca0")

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      injectedProvider: null,
      address: null
    };
  }

  render() {
    return (
      <AragonNavbar>
        <LogoLink to="/">
          <Link to="/"><img src={logo} /></Link>
        </LogoLink>
        <Wallet
          className="btn waves-effect waves-light hoverable accent-3"
          address={this.state.address}
          setAddress={(v) => this.setState({ address: v })}
          localProvider={localProvider}
          injectedProvider={this.state.injectedProvider}
          setInjectedProvider={(v) => this.setState({ injectedProvider: v })}
          mainnetProvider={mainnetProvider}
        />
        <GitHubLogin clientId="fe47d6b2b5729043b08d"
          className="btn waves-effect waves-light hoverable accent-3"
          redirectUri="http://localhost:3001/dashboard"
          onSuccess={onSuccess}
          onFailure={onFailure} />
          
      </AragonNavbar>
    )
  }
}

const AragonNavbar = styled.div`
  width: 80%;
  height: 80px;
  background: transparent;
  position:absolute;
  top:0;
  left: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3000;
`

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  img {
    height: 50px;
  }
`
export default Navbar