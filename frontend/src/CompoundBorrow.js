import React, { useEffect, useState } from 'react';
import web3 from "./web3";

// ABI imports
let abi = [
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_cEtherAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_comptrollerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_priceOracleAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_cDaiAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_erc20Address",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Log",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "cDai",
      "outputs": [
        {
          "internalType": "contract CErc20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "cDaiAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "cEth",
      "outputs": [
        {
          "internalType": "contract CEth",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "cEtherAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "comptroller",
      "outputs": [
        {
          "internalType": "contract Comptroller",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "dai",
      "outputs": [
        {
          "internalType": "contract Erc20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "priceOracle",
      "outputs": [
        {
          "internalType": "contract PriceOracle",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "borrowErc20",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getBorrowBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "myErc20RepayBorrow",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

let address = '0xc9Dfd4D6a7d00565b4145E50C6ee9038cf738F2a';

export default new web3.eth.Contract(abi, address);
