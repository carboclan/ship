import React, { useEffect } from "react";
import { ethers } from "ethers";
import BurnerProvider from 'burner-provider';
import Web3Modal from "web3modal";
import Portis from '@portis/web3';
import Fortmatic from "fortmatic";
import Squarelink from "squarelink";
import Authereum from "authereum";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Balance from "../eth/Balance"
import Address from "../eth/Address"
import {
 Button,  IconConnect, Box, IconPower, LinkBase,
} from '@aragon/ui';
import WalletConnectProvider from "@walletconnect/web3-provider";
import usePoller from "../hooks/Poller"


const INFURA_ID = "beb925e5da5847928e43bef7df96bca0" 
const PORTIS_ID = "350a722b-40fe-46a4-b53f-b18276b2aefc"
const FORTMATIC_KEY = "pk_test_9AA5A5B094CD1A0A"
const SQUARELINK_ID = "b09409f678168322422f"

const providerOptions = {
    portis: {
        package: Portis, // required
        options: {
          id: PORTIS_ID // required
        }
      },
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: INFURA_ID
        }
    },
    fortmatic: {
        package: Fortmatic, // required
        options: {
          key: FORTMATIC_KEY // required
        }
      },
      squarelink: {
        package: Squarelink, // required
        options: {
          id: SQUARELINK_ID // required
        }
      },
      authereum: {
        package: Authereum // required
      },
      burnerconnect: {
        package: BurnerConnectProvider, // required
        options: {
          defaultNetwork: "100"
        }
      }
  };
  
const web3Modal = new Web3Modal({
    // network: "rinkeby", // optional
    cacheProvider: true, // optional
    providerOptions // required
});

export default function Wallet(props) {
    const createBurnerIfNoAddress = () => {
        if (!props.injectedProvider && props.localProvider){
          if(props.localProvider.connection && props.localProvider.connection.url){
            props.setInjectedProvider(new ethers.providers.Web3Provider(new BurnerProvider(props.localProvider.connection.url)))
          }else if( props.localProvider._network && props.localProvider._network.name ){
            props.setInjectedProvider(new ethers.providers.Web3Provider(new BurnerProvider("https://"+props.localProvider._network.name+".infura.io/v3/"+INFURA_ID)))
          }else{
            props.setInjectedProvider(new ethers.providers.Web3Provider(new BurnerProvider("https://rinkeby.infura.io/v3/"+INFURA_ID)))
          }
        }else{
          pollInjectedProvider()
        }
      }
      useEffect(createBurnerIfNoAddress, [props.injectedProvider]);
    
      const pollInjectedProvider = async ()=>{
        if(props.injectedProvider){
          let accounts = await props.injectedProvider.listAccounts()
          if(accounts && accounts[0] && accounts[0] != props.account){
            if(typeof props.setAddress == "function") props.setAddress(accounts[0])
          }
        }
      }
      usePoller(()=>{pollInjectedProvider()},props.pollTime?props.pollTime:1999)
    
      const loadWeb3Modal = async ()=>{
        const provider = await web3Modal.connect();
        props.setInjectedProvider(new ethers.providers.Web3Provider(provider))
        pollInjectedProvider()
      }
    
      const logoutOfWeb3Modal = async ()=>{
        const clear = await web3Modal.clearCachedProvider();
        setTimeout(()=>{
          window.location.reload()
        },1)
      }
    
      let modalButtons = []
      if (web3Modal.cachedProvider) {
        modalButtons.push(
            <Button className="btn btn-sm waves-effect waves-light hoverable accent-3"  onClick={logoutOfWeb3Modal}>
            Disconnect Wallet
          </Button>
        )
      }else{
        modalButtons.push(
            <Button className="btn btn-sm waves-effect waves-light hoverable accent-3" onClick={loadWeb3Modal}>
            Connect to Wallet 
          </Button>
        )
      }
    
      React.useEffect(async () => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal()
        }
      }, []);
    
      return (
        <>
          {modalButtons}
        </>
      );
}
