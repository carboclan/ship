import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";
import ContributorSlot from "../contributor-slot";
import Aave from '../aave-lending/Aave';
import Borrow from '../compound'

// Options details
import ocDAI from '../../ocDAI';
import optionsFactory from '../../optionsFactory';
import web3 from '../../web3';

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
      <Container style={{ height: "150vh", marginTop: "100px" }}>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8">
            <div>
              <h2>
                <p className="flow-text text-darken-1"><b>Project Specification</b></p>
              </h2>
              <br />
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-row">
                <div class="form-group col-md-6">
                <label for="name" className="lb-sm">Project Title</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                  class="form-control"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <span className="red-text">{errors.name}</span>
                </div>
                <div class="form-group col-md-6">
                <label for="productVersion" className="lb-sm">Product Version</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="productVersion"
                  type="text"
                  class="form-control"
                  className={classnames("", {
                    invalid: errors.productVersion,
                  })}
                />
                <span className="red-text">{errors.productVersion}</span>
                </div>
              </div>
              <div class="form-group">
              <label for="specification" className="lb-sm">Specification</label>
                <input
                  onChange={this.onChange}
                  value={this.state.specification}
                  id="specification"
                  type="text"
                  class="form-control"
                  className={classnames("materialize-textarea", {
                    invalid: errors.specification,
                  })}
                />
                <span className="red-text">{errors.specification}</span>
              </div>
              <div class="form-group">
              <label for="objectives" className="lb-sm">Target Project Milestones</label>
                <input
                  onChange={this.onChange}
                  value={this.state.objectives}
                  id="objectives"
                  type="text"
                  class="form-control"
                  className={classnames("materialize-textarea", {
                    invalid: errors.objectives,
                  })}
                />
                <span className="red-text">{errors.objectives}</span>
              </div>
              <div class="form-group">
              <label for="strikePrice" className="lb-sm">Strike Price (DAI) </label>
                <input
                  onChange={this.onChangeCurrency}
                  value={this.state.strikePrice}
                  id="strikePrice"
                  type="text"
                  class="form-control"
                  className={classnames("", {
                    invalid: errors.strikePrice,
                  })}
                />
                <span className="red-text">{errors.strikePrice}</span>
              </div>
              <div class="form-group">
              <label for="shippingDuration" className="lb-sm">
                  Project Duration (Days)
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.shippingDuration}
                  id="shippingDuration"
                  type="number"
                  class="form-control"
                  step={1}
                  min={1}
                  className={classnames("", {
                    invalid: errors.shippingDuration,
                  })}
                />
                <span className="red-text">{errors.shippingDuration}</span>
              </div>
              <div class="form-group">
              <label for="exerciseableDuration" className="lb-sm">
                  Exerciseable Duration (days)
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.exerciseableDuration}
                  id="exerciseableDuration"
                  type="number"
                  class="form-control"
                  step={1}
                  min={1}
                  className={classnames("", {
                    invalid: errors.exerciseableDuration,
                  })}
                />
                <span className="red-text">{errors.exerciseableDuration}</span>
              </div>
              <br />
              <p className="flow-text text-darken-1">
                <b>Flash Org Specification</b>
              </p>
              <br />
              <p className="h1">
                Add Contributors to Flash Org
              </p>
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
                      className="btn"
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
                <div>
                  <button
                    style={{
                      width: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    type="button"
                    className="btn"
                    onClick={this.onAddContributor}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div >
                <button
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn"
                >
                  Create
                </button>
                <div>
                  <br />
                  <p className="flow-text text-darken-1">
                    <b>Issue Puttable Equity</b>
                  </p>
                  <div class="row">
                  <span className="h1">
                    Create an Options Contract
                  </span>
                  <button
                    style={{
                      width: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    onClick={this.createOptionsContract}
                    className="btn"
                  >
                    Create
            </button>
            </div>
                </div>
                <div>
                  <br />
                  <p className="h1">
                    Add a vault, ERC20 collateral and Issue oTokens
                  </p>
                  <button
                    style={{
                      width: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    onClick={this.createOptionsContract}
                    className="btn"
                  >
                    Issue
            </button>
                </div>
                <Aave />
                <Borrow />
              </div>
            </form>
          </div>
        </div>
      </Container>
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

  .lb-sm {
    font-size: 14px;
  }
  .h1 {
    font-size: 20px;
  }
`;


export default connect(mapStateToProps, { createProject })(CreateProject);