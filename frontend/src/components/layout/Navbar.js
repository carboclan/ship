import React from 'react'
import Wallet from "../auth/Wallet"
import { ethers } from "ethers";
import styled from 'styled-components'

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
          <a href='/'>$HIP</a>
        </LogoLink>
        <Wallet
          address={this.state.address}
          setAddress={(v) => this.setState({ address: v })}
          localProvider={localProvider}
          injectedProvider={this.state.injectedProvider}
          setInjectedProvider={(v) => this.setState({ injectedProvider: v })}
          mainnetProvider={mainnetProvider}
        />
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