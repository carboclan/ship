import React from "react";
import classnames from "classnames";

const ContributorSlot = (props) => (
  <div>
    <div className="input-field col s12">
      <input
        onChange={(e) => props.onChange("requirements", e.target.value)}
        value={props.contributor.requirements}
        id="requirements"
        type="text"
        className={classnames("", {
          invalid: props.errors.requirements,
        })}
      />
      <label htmlFor="requirements">Requirements</label>
      <span className="red-text">{props.errors.requirements}</span>
    </div>
    <div className="input-field col s12">
      <input
        onChange={(e) => props.onChange("responsibilities", e.target.value)}
        value={props.contributor.responsibilities}
        id="responsibilities"
        type="text"
        className={classnames("", {
          invalid: props.errors.responsibilities,
        })}
      />
      <label htmlFor="responsibilities">Responsibilities</label>
      <span className="red-text">{props.errors.responsibilities}</span>
    </div>
    <div className="input-field col s12">
      <input
        onChange={(e) => props.onChange("equity", e.target.value)}
        value={props.contributor.equity}
        id="equity"
        type="number"
        min={0}
        step={1}
        className={classnames("", {
          invalid: props.errors.equity,
        })}
      />
      <label htmlFor="equity">Equity</label>
      <span className="red-text">{props.errors.equity}</span>
    </div>
  </div>
);

export default ContributorSlot;
