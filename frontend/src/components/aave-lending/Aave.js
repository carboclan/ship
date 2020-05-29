import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Web3 from "web3";

// ABI imports
import ERC20ABI from '../../Aave-ABIs/ERC20.json'
import LendingPoolAddressProviderABI from '../../Aave-ABIs/AddressProvider.json'
import LendingPoolABI from '../../Aave-ABIs/LendingPool.json'

function Aave() {
    const [web3, setWeb3] = useState(null)
    const [myAddress, setMyAddress] = useState(null)

    useEffect(() => {
        async function getAccount() {
            const getWeb3 = new Web3(window.ethereum)
            window.ethereum.enable()
            window.web3 = getWeb3

            setWeb3(getWeb3)
            const address = (await getWeb3.eth.getAccounts())[0]
            console.log("Wallet address: ", address)
            setMyAddress(address)
        }

        getAccount()
    }, [])

    // Create the LendingPoolAddressProvider contract instance
    function getLendingPoolAddressProviderContract() {
        const lpAddressProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8" // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
        const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressProviderABI, lpAddressProviderAddress)
        return lpAddressProviderContract
    }

    // Get the latest LendingPoolCore address
    async function getLendingPoolCoreAddress() {
        const lpCoreAddress = await getLendingPoolAddressProviderContract()
            .methods.getLendingPoolCore()
            .call()
            .catch((e) => {
                throw Error(`Error getting lendingPool address: ${e.message}`)
            })

        console.log("LendingPoolCore address: ", lpCoreAddress)
        return lpCoreAddress
    }

    // Get the latest LendingPool address
    async function getLendingPoolAddress() {
        const lpAddress = await getLendingPoolAddressProviderContract().methods
            .getLendingPool()
            .call()
            .catch((e) => {
                throw Error(`Error getting lendingPool address: ${e.message}`)
            })
        console.log("LendingPool address: ", lpAddress)
        return lpAddress
    }

    /**
     * Deposit DAI into Aave to receive the equivalent aDAI
     * Note: User must have DAI already in their wallet!
     */
    async function deposit() {
        const daiAmountinWei = web3.utils.toWei("1000", "ether").toString()
        const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F" // mainnet DAI
        const referralCode = "0"

        try {
            const lpCoreAddress = await getLendingPoolCoreAddress()

            // Approve the LendingPoolCore address with the DAI contract
            const daiContract = new web3.eth.Contract(ERC20ABI, daiAddress)
            await daiContract.methods
                .approve(lpCoreAddress, daiAmountinWei)
                .send({ from: myAddress })
                .catch((e) => {
                    throw Error(`Error approving DAI allowance: ${e.message}`)
                })

            // Make the deposit transaction via LendingPool contract
            const lpAddress = await getLendingPoolAddress()
            const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress)
            await lpContract.methods
                .deposit(daiAddress, daiAmountinWei, referralCode)
                .send({ from: myAddress })
                .catch((e) => {
                    throw Error(`Error depositing to the LendingPool contract: ${e.message}`)
                })
        } catch (e) {
            alert(e.message)
            console.log(e.message)
        }
    }

    return (
        <Container>
            <div className="row">
                <div>
                <br/>
                    <p className="flow-text text-darken-1">
                        <b>Earn</b> interest with Aave
        </p>
                    <div className="col s12">
                    <br/>
                        <button style={{
                      width: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }} className="btn" onClick={async () => await deposit()}>
                            Deposit </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
  .btn {
  border: solid 1px #BDB76B;
  font-size: 1rem;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  width: 200px;
  height: 50px;
  max-width: 100%;
  display: inherit;
  padding: 15px;
  cursor: pointer;
  margin: 20px auto 0 auto;
  text-decoration: none!important;
  color: white!important;
  &:hover {
  background: #BDB76B;
  }
  }
`;

export default Aave;