import React, { Component } from 'react';
import styled from 'styled-components';
import opyn from '../assets/opyn.png';
import { breakpoint } from '@aragon/ui';

import web3 from '../../web3';
import ocDAI from '../../ocDAI';
import optionsFactory from '../../optionsFactory';

const medium = css => breakpoint('medium', css);

class OpynOptions extends Component {
    constructor() {
        super();
        this.state = {
          transactionHash: ''
        };
      }

      createOptionsContract = async (event) => {
        event.preventDefault();
        // Get available accounts from eth provider
        const accounts = await web3.eth.getAccounts();
        
        // Creates an options contract
        await optionsFactory.methods.createOptionsContract("ETH",
          "1",
          "DAI",
          '1',
          "1",
          "1",
          "1",
          "ETH",
          '1574457816', '1').send({
            from: accounts[0]
          }, (error, transactionHash) => {
            console.log(transactionHash);
            this.setState({ transactionHash });
          });
      }
    
      createERC20Collateral = async (event) => {
        event.preventDefault();
        // Get available accounts from eth provider
        const accounts = await web3.eth.getAccounts();
    
        // Specify the amount of ERC20 collateral you want to put down in wei
        const collateral = '1000000000000000000';
    
        // This function tells you the maximum number of options you can safely issue at 160% collateralization. 
        // Note: It is reccomended that you create less than this amount of options. 
        const maxNumOptions = 100;
        //await ocDAI.methods.maxOTokensIssuable(collateral).call();
    
        // Assuming you want to be 200% collateralized
        const collateralizationRatio = 200;
        const numOptions = maxNumOptions * 160 / collateralizationRatio;
    
        // Creates an options contract
        await ocDAI.methods.createERC20CollateralOption(
          numOptions,
          collateral,
          '0x99dE7B407C4d26909527001e2556Aa5D159F316d').send({
            from: accounts[0]
          }, (error, transactionHash) => {
            console.log(transactionHash);
            this.setState({ transactionHash });
          });
      }

    render() {
        return (
            <Container>
            <EventsSection id="events">
              <Box>
                <Event>
                  <h2>
                    <b>Issue Puttable Equity</b>
                  </h2>
                  <h6>
                                    <b>Create an Options Contract: <span className="grey-text">Powered by</span>
                                    <img src={opyn} width="47" height="35" style={{marginLeft: "10px"}}/><button
                                        className="btn"
                                        style={{ 
                                            marginLeft: "25px",
                                                width: "100px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "1rem",
                
                                         }}
                                         onClick={this.createOptionsContract}
                                    >
                                        Create
              </button></b>
                                </h6>
                                <h6>
                                    <b>Add ETH Collateral and Issue oTokens: <span className="grey-text">Powered by</span>
                                    <img src={opyn} width="47" height="35" style={{marginLeft: "10px"}}/><button
                                        className="btn"
                                        style={{ 
                                            marginLeft: "25px",
                                                width: "100px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "1rem",
                
                                         }}
                                         onClick={this.createOptionsContract}
                                    >
                                        Issue
              </button></b>
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
`;

const Box = styled.div`
  width: 100%;
  min-height: 300px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  ${medium('flex-direction: row;')};
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
`;

export default OpynOptions;