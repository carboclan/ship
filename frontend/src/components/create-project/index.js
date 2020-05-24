import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";
import ContributorSlot from "../contributor-slot";

// Options details
import ocDAI from '../../ocDAI';
import optionsFactory from '../../optionsFactory';
import web3 from '../../web3';

import {breakpoint, BreakPoint} from '@aragon/ui';
const medium = css => breakpoint('medium', css);
const large = css => breakpoint('large', css);

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      productVersion: "",
      specification: "",
      objectives: "",
      contributorSlots: [],
      strikePrice: "0.0",
      shippingDuration: "30",
      exerciseableDuration: "30",
      transactionHash: ''
    };
  }

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
  
  onChangeCurrency = (e) => {
    let value = e.target.value;
    value.replace(/[^0-9.]/, "");
    const decimals = value.match(/\./g);
    this.setState({
      [e.target.id]: decimals && decimals.length > 1 ? "0.0" : value,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChangeContributor = (index, property, value) => {
    this.setState((prevState) => {
      const newContribSlots = prevState.contributorSlots;
      newContribSlots[index][property] = value;
      return {
        ...prevState,
        contributorSlots: newContribSlots,
      };
    });
  };
  onRemoveContributor = (index) => {
    this.setState((prevState) => ({
      ...prevState,
      contributorSlots: prevState.contributorSlots.filter(
        (slot, i) => i !== index
      ),
    }));
  };
  onAddContributor = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      contributorSlots: [
        ...prevState.contributorSlots,
        {
          requirements: "",
          responsibilities: "",
          equity: "0",
        },
      ],
    }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    const createProjectDTO = {
      ownerId: this.props.auth.user.id,
      name: this.state.name,
      productVersion: this.state.productVersion,
      specification: this.state.specification,
      objectives: this.state.objectives,
      contributorSlots: this.state.contributorSlots,
      strikePrice: web3.utils.toWei(this.state.strikePrice), // currency
      shippingDuration: this.state.shippingDuration * 86400, // day to seconds
      exerciseableDuration: this.state.exerciseableDuration * 86400, // day to seconds
    };
    console.log(createProjectDTO);
    this.props.createProject(createProjectDTO);
  };

  render() {
    const errors = {};
    if (this.props.errors.joi) {
      if (this.props.errors.joi.details[0].path[0] === "contributorSlots") {
        errors.contributorSlots = true;
        errors.contribotorSlotIndex = this.props.errors.joi.details[0].path[1];
        errors[
          this.props.errors.joi.details[0].path[2]
        ] = this.props.errors.joi.details[0].message;
      } else {
        errors[
          this.props.errors.joi.details[0].context.key
        ] = this.props.errors.joi.details[0].message;
      }
      console.log(errors);
    }
    console.log(this.state);
    return (
      <div className="container" style={{ height: "40vh" }}>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Create a Project</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.productVersion}
                  id="productVersion"
                  type="text"
                  className={classnames("", {
                    invalid: errors.productVersion,
                  })}
                />
                <label htmlFor="productVersion">Product Version</label>
                <span className="red-text">{errors.productVersion}</span>
              </div>
              <div className="input-field col s12">
                <textarea
                  onChange={this.onChange}
                  value={this.state.specification}
                  id="specification"
                  className={classnames("materialize-textarea", {
                    invalid: errors.specification,
                  })}
                />
                <label htmlFor="specification">Specification</label>
                <span className="red-text">{errors.specification}</span>
              </div>
              <div className="input-field col s12">
                <textarea
                  onChange={this.onChange}
                  value={this.state.objectives}
                  id="objectives"
                  type="text"
                  className={classnames("materialize-textarea", {
                    invalid: errors.objectives,
                  })}
                />
                <label htmlFor="objectives">Objectives</label>
                <span className="red-text">{errors.objectives}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangeCurrency}
                  value={this.state.strikePrice}
                  id="strikePrice"
                  type="text"
                  className={classnames("", {
                    invalid: errors.strikePrice,
                  })}
                />
                <label htmlFor="strikePrice">Strike Price (DAI) </label>
                <span className="red-text">{errors.strikePrice}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.shippingDuration}
                  id="shippingDuration"
                  type="number"
                  step={1}
                  min={1}
                  className={classnames("", {
                    invalid: errors.shippingDuration,
                  })}
                />
                <label htmlFor="shippingDuration">
                  Project Duration (days)
                </label>
                <span className="red-text">{errors.shippingDuration}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.exerciseableDuration}
                  id="exerciseableDuration"
                  type="number"
                  step={1}
                  min={1}
                  className={classnames("", {
                    invalid: errors.exerciseableDuration,
                  })}
                />
                <label htmlFor="exerciseableDuration">
                  Exerciseable Duration (days)
                </label>
                <span className="red-text">{errors.exerciseableDuration}</span>
              </div>
              <h4>Contributors</h4>
              <span className="red-text">
                {errors.contributorSlots && !errors.contribotorSlotIndex
                  ? "Must Contain at least one Contributor Slots"
                  : ""}
              </span>
              <div>
                {this.state.contributorSlots.map((contributor, index) => (
                  <div key={index}>
                    <strong>Contributor #{index + 1}</strong>
                    <br />
                    <button
                      style={{
                        width: "100px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                      }}
                      type="button"
                      className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                      onClick={() => this.onRemoveContributor(index)}
                    >
                      Remove
                    </button>
                    <ContributorSlot
                      errors={errors.index === index ? errors : {}}
                      contributor={contributor}
                      onChange={(property, value) =>
                        this.onChangeContributor(index, property, value)
                      }
                    />
                  </div>
                ))}
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    type="button"
                    className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                    onClick={this.onAddContributor}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});


export default connect(mapStateToProps, { createProject })(CreateProject);