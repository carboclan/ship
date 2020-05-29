import React, { useEffect, useState } from 'react';
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
        const lpAddressProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728" // kovan address
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
        const daiAddress = "0x99dE7B407C4d26909527001e2556Aa5D159F316d" // kovan DAI
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
        <>
            <button
                className="btn"
                style={{
                    marginLeft: "25px",
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",

                }}
                onClick={async () => await deposit()}
            >
                Deposit
              </button>
        </>
    )
}

export default Aave;