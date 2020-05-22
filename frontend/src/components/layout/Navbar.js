
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Main, textStyle} from '@aragon/ui';
import { Link } from "react-router-dom";

import {
  Bar, LinkBase,
} from '@aragon/ui';

import ChangeModeButton from "./SwitchTheme";

// Wallet imports
import Wallet from "../auth/Wallet"
 import { ethers } from "ethers";

 //const mainnetProvider = new ethers.providers.InfuraProvider("mainnet","beb925e5da5847928e43bef7df96bca0")
 //const localProvider = new ethers.providers.InfuraProvider("rinkeby","beb925e5da5847928e43bef7df96bca0")
 /*
           <Wallet
              address={address}
              setAddress={(v) => setAddress(v)}
              localProvider={localProvider}
              injectedProvider= {injectedProvider}
              setInjectedProvider={(v) => setInjectedProvider(v)}
              mainnetProvider={mainnetProvider}
            />*/

const NavbarProps = {
  theme: {},
  updateTheme: {}
}

function NavBar({
  theme, updateTheme, user, setUser,
} = NavbarProps) {

  const history = useHistory();
  const [isHome, updateIsHome] = useState(true);

  const [injectedProvider, setInjectedProvider] = useState(true);
  const [address, setAddress] = useState(true)

  useEffect(() => {
    const home = history.location.pathname === '/';
    updateIsHome(home);
  }, [history.location.pathname]);

  return (
    <Bar
      primary={
        (
          <>
            <Link to="/">
            $HIP</Link>
          </>
        )
      }
      secondary={(
        <>
          <ChangeModeButton theme={theme} updateTheme={updateTheme} />
        </>
      )}
    />
  );
}


const linkButtonProps = {
  title: String,
  onClick: Function,
  isSelected: Boolean
}

function LinkButton({ title, onClick, isSelected = false } = linkButtonProps) {
  return (
    <div style={{ paddingLeft: 40 }}>
      <LinkBase onClick={onClick}>
        <div style={{ padding: '1%', opacity: isSelected ? 1 : 0.5, fontSize: 16 }}>{title}</div>
      </LinkBase>
    </div>
  );
}

export default NavBar;