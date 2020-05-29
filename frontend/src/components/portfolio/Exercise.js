import React, { Component } from "react";
import styled from 'styled-components';
import ocDAI from '../../ocDAI';
import optionsFactory from '../../optionsFactory';
import web3 from '../../web3';

class Exercise extends Component {
    constructor() {
        super();
        this.state = {
          transactionHash: ''
        };
      }
    
      exercise = async (event) => {
        event.preventDefault();
        // Get available accounts from eth provider
        const accounts = await web3.eth.getAccounts();
    
        //const factory = await OptionsFactory.at('0xABCD...');
    
        // Creates an options contract
        await ocDAI.methods.exercise('1', ['0x99dE7B407C4d26909527001e2556Aa5D159F316d']).send({
            from: accounts[0]
          }, (error, transactionHash) => {
            console.log(transactionHash);
            this.setState({ transactionHash });
          });
      }

      render() {
        return (
            <Container>
                            <button className="btn" onClick={this.exercise}>
                                Cash Out </button>
            </Container>
        )
    }
}

const Container = styled.div`
  .btn {
  border: solid 1px #BDB76B;
  font-size: 1rem;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  width: 100px;
  height: 70px;
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

export default Exercise;