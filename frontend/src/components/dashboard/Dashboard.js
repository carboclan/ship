import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import CreateProject from "../create-project";

// Options details
import ocDAI from '../../ocDAI';
import optionsFactory from '../../optionsFactory';
import web3 from '../../web3';

class Dashboard extends Component {
  state = {
    transactionHash: ''
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  createOptionsContract = async (event) => {
    event.preventDefault();
    // Get available accounts from eth provider
    const accounts = await web3.eth.getAccounts();

    //const factory = await OptionsFactory.at('0xABCD...');

    // Creates an options contract
    await optionsFactory.methods.createOptionsContract("ETH",
    "1",
    "USDC", 
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
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <p className="flow-text text-darken-1">
              <b>Hey there,</b> {user.name.split(" ")[0]} 👋
            </p>

            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Log out
            </button>
          </div>
          <div className="col s12 center-align">
          <br/>
          <p className="flow-text text-darken-1">
              Create an Options Contract
            </p>
          <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.createOptionsContract}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Create 
            </button>
          </div>
          <div className="col s12 center-align">
          <br/>
          <p className="flow-text text-darken-1">
              ERC20 Collateralized Options
          </p>
            <p className="flow-text text-darken-1">
            Add a vault, ERC20 collateral and issue oTokens
            </p>
          <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.createERC20Collateral}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Issue 
            </button>
          </div>
          <div className="col s12 center-align">
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);