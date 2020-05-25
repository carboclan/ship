import React, { Component } from "react";
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
            <div style={{ paddingRight: "29.250px" }}>
                <div className="row">
                    <div className="col s12">
                        <br />
                        <p className="flow-text text-darken-1">
                            <b>Borrow</b> ERC20 with Compound
    </p>
                        <div className="col s12">
                            <br />
                            <button className="btn waves-effect waves-light hoverable accent-3" onClick={this.borrow}>
                                Borrow </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Borrow;