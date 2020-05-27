import React, { Component } from "react";

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
            <div style={{ paddingRight: "29.250px" }}>
                <div className="row">
                    <div className="col s12">
                        <br />
                        <p className="flow-text text-darken-1">
                            <b>Exercise</b>
    </p>
                        <div className="col s12">
                            <br />
                            <button className="btn waves-effect waves-light hoverable accent-3" onClick={this.exercise}>
                                Cash Out </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Exercise;