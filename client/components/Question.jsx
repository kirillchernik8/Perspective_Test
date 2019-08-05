import React, { Component } from "react";

class Question extends Component {
  constructor() {
    super();
  }

  render() {
    let values = [1, 2, 3, 4, 5 ,6, 7];
    return (
      <div className="question">
        <div className="QuestionText">{this.props.question.question}</div>
        <div className="ADR"> 
        <div className="Disagree">Disagree</div>
	     	<div className="Agree">Agree</div>
          <div className="Group21">
            {values.map(value => {
			  // let resultValue = value * this.props.question.impact
              return (
                <label  className="container">
                  <input
                    type="radio"
                    value={value}
                    id={this.props.question.type}
                    name={this.props.question.id}
                    className="radio"
					          onChange={e => {this.props.onSelect(e); }}
                  />
                  <span className="checkmark"></span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
