import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      productVersion: "",
      specification: "",
      objectives: "",
      contributorSlots: [],
      strikePrice: "",
      shippingDuration: "",
      exerciseableDuration: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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
      strikePrice: this.state.strikePrice,
      shippingDuration: this.state.shippingDuration,
      exerciseableDuration: this.state.exerciseableDuration,
    };
    this.props.createProject(createProjectDTO);
  };

  render() {
    console.log(this.state);
    const { errors } = this.state;
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
                  error={errors.joi}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.productVersion}
                  error={errors.joi}
                  id="productVersion"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="productVersion">Product Version</label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.specification}
                  error={errors.joi}
                  id="specification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="specification">Specification</label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.objectives}
                  error={errors.joi}
                  id="objectives"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="objectives">Objectives</label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
              </div>
              {/* COntributor SLots Here */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.strikePrice}
                  error={errors.joi}
                  id="strikePrice"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="strikePrice">Strike Price</label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.shippingDuration}
                  error={errors.joi}
                  id="shippingDuration"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="shippingDuration">Project Duration</label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.exerciseableDuration}
                  error={errors.joi}
                  id="exerciseableDuration"
                  type="text"
                  className={classnames("", {
                    invalid: errors.joi || errors.joi,
                  })}
                />
                <label htmlFor="exerciseableDuration">
                  Exerciseable Duration
                </label>
                <span className="red-text">
                  {errors.joi}
                  {errors.joi}
                </span>
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
