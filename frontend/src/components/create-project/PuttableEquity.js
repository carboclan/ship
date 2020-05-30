import React, { Component } from 'react';
import styled from 'styled-components';
import Aave from '../aave-lending/Aave';
import compoundLogo from '../assets/compound-logo.png'
import aave from '../assets/aave.png'
import { breakpoint, BreakPoint, Button } from '@aragon/ui';

import web3 from '../../web3';
import CompoundBorrow from '../../CompoundBorrow';

const medium = css => breakpoint('medium', css);
const large = css => breakpoint('large', css);

class PuttableEquity extends Component {
    constructor() {
        super();
        this.state = {
          transactionHash: ''
        };
      }

    // Borrow with compound
    borrow = async (event) => {
        event.preventDefault();
        // Get available accounts from eth provider
        const accounts = await web3.eth.getAccounts();
        
        const daiToRepayBorrow = '1';
        const ethToSupplyAsCollateral = '1';

        console.log("HERE");

        let result = await CompoundBorrow.methods.borrowErc20(daiToRepayBorrow).send({
            from: accounts[0],
            gasLimit: web3.utils.toHex(5000000),      // posted at compound.finance/developers#gas-costs
            value: web3.utils.toHex(web3.utils.toWei(ethToSupplyAsCollateral, 'ether'))
        }, (error, transactionHash) => {
            console.log(transactionHash);
            this.setState({ transactionHash });
        });

        console.log(result.events.MyLog);
    }

    render() {
        return (
            <Container>
            <EventsSection id="events">
              <Box>
                <Event>
                  <h2>
                    <b>Financing Choices</b>
                  </h2>
                  <h6>
                                    <b>Borrow with Compound: <span className="grey-text">Powered by</span>
                                    <img src={compoundLogo} width="50" height="35" style={{marginLeft: "10px"}}/><button
                                        className="btn"
                                        style={{ 
                                            marginLeft: "25px",
                                                width: "100px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "1rem",
                
                                         }}
                                         onClick={this.borrow}
                                    >
                                        Borrow
              </button></b>
                                </h6>
                                <h6>
                                    <b>Earn Interest with Aave: <span className="grey-text">Powered by</span>
                                    <img src={aave} width="60" height="15" style={{marginLeft: "10px"}}/><Aave/></b>
                                </h6>
                </Event>
                <Offsite>
                </Offsite>
              </Box>
            </EventsSection>
          </Container>
        )
    }
}

const Event = styled.div`
  background-color: #191919;
  padding: 30px;
  width: 100%;
  ${medium('width: 70%;')};
  iframe {
    width: 100%;
    height: 42vw;
    ${medium('height: 23vw;')};
  }
  h6 {
    margin: 60px 0 20px 0 !important;
  }
  h1 {
    font-size: 10vw;
    ${medium('font-size: 7vw;')};
  }
  h2 {
      font-size: 26px;
      font-family: 'FontBold';
  }
  .btn {
    border: solid 1px #BDB76B;
    font-size: 1rem;
    text-align: center;
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
const Offsite = styled.div`
  background-color: #191919;
  padding: 30px;
  width: 100%;
  ${medium('width: 30%;')};
  text-align: center;
  h6 {
    margin: 20px 0 20px 0 !important;
    line-height: 1.4 !important;
  }
  h2 {
    font-size: 22px;
    letter-spacing: 4px;
    color: #ffffff;
  }
  .btn {
    border: solid 1px #BDB76B;
    font-size: 1rem;
    text-align: center;
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

const EventsSection = styled.section`
  height: auto;
  padding: 0 0 100px 0;
  margin-bottom: 100px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${medium('flex-direction: row;')};
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
`;

export default PuttableEquity;