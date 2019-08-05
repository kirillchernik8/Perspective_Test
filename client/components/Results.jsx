import React, { Component } from "react";


class Results extends Component {
  constructor() {
    super();
    this.state = {
      finalResult: [],
      type: ""
    };
    this.calculateResults = this.calculateResults.bind(this);
    this.calculateType = this.calculateType.bind(this);
  }
  componentDidMount() {
    this.calculateResults();
  }

  calculateOneResult(array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
      result += array[i];
    }

    let avgValue = 4 * array.length;
    if (result >= avgValue) {
      result = 1;
    } else {
      result = -1;
    }

    return result;
  }

  calculateResults() {
    this.setState(
      {
        finalResult: [
          {
            title: "Extraversion",
            value: this.calculateOneResult(this.props.result.EI)
          },
          {
            title: "Intuition",
            value: this.calculateOneResult(this.props.result.TF)
          },
          {
            title: "Feeling",
            value: this.calculateOneResult(this.props.result.SN)
          },
          {
            title: "Percieving",
            value: this.calculateOneResult(this.props.result.JP)
          }
        ]
      },
      () => this.calculateType()
    );
  }

  calculateType() {
    let resultType = "";

    if (
      this.state.finalResult[0].value > 0 &&
      this.state.finalResult[0].value !== null
    ) {
      resultType += "E";
    } else {
      resultType += "I";
    }

    if (
      this.state.finalResult[1].value > 0 &&
      this.state.finalResult[1].value !== null
    ) {
      resultType += "S";
    } else {
      resultType += "N";
    }

    if (
      this.state.finalResult[2].value > 0 &&
      this.state.finalResult[2].value !== null
    ) {
      resultType += "T";
    } else {
      resultType += "F";
    }

    if (
      this.state.finalResult[3].value > 0 &&
      this.state.finalResult[3].value !== null
    ) {
      resultType += "J";
    } else {
      resultType += "P";
    }

    this.setState({ type: resultType });
  }

  render() {
    console.log(this.state.type[0]);
    return (
      <div className="results">
        <div className="yourPerspective">Your perspective</div>
        <div className="yourType">
          Your Perspective Type is {this.state.type}{" "}
        </div>

        <div className="resultGraph">
          <div className="left">
            <span>Introversion (I) </span>
            <span> Sensing (S) </span>
            <span> Thinking (T) </span>
            <span> Judging (J) </span>
          </div>

          <div className="chart">
            <div
              className={this.state.type[0] === "I" ? "negative" : "positive"}
            />
          </div>

          <div className="chart">
            <div
              className={this.state.type[0] === "S" ? "positive" : "negative"}
            />
          </div>

          <div className="chart">
            <div
              className={this.state.type[0] === "T" ? "negative" : "positive"}
            />
          </div>

          <div className="chart">
            <div
              className={this.state.type[0] === "J" ? "positive" : "negative"}
            />
          </div>
        </div>

        <div>
          <span className="right "> Extraversion (E) </span>
          <span className="right "> Intuition (N) </span>
          <span className="right "> Feeling (F) </span>
          <span className="right "> Perceiving (P) </span>
        </div>
      </div>
    );
  }
}

export default Results;
