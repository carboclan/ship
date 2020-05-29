import React, { Component } from "react";
import styled from 'styled-components';

import PropTypes from "prop-types";
import web3 from '../../web3';
import CompoundBorrow from '../../CompoundBorrow';

class Borrow extends Component {


    borrow = async (event) => {
        event.preventDefault();
        // Get available accounts from eth provider
        const accounts = await web3.eth.getAccounts();

        //const factory = await OptionsFactory.at('0xABCD...');

        // Creates an options contract
        await CompoundBorrow.methods.borrowErc20('5').send({
            from: accounts[0]
        }, (error, transactionHash) => {
            console.log(transactionHash);
            this.setState({ transactionHash });
        });
    }
    render() {
        return (
            <Container>
                <div className="row">
                    <div>
                        <br />
                        <p className="flow-text text-darken-1">
                            <b>Borrow</b> ERC20 with Compound
    </p>
                        <div>
                            <br />
                            <button className="btn" style={{
                      width: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }} onClick={this.borrow}>
                                Borrow </button>
                        </div>
                    </div>
                </div>
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


export default Borrow;