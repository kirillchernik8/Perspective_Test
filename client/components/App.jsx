import React, { Component } from "react";
import ReactDOM from "react-dom";
import Question from "./Question.jsx";
import Email from "./Email.jsx";
import Results from "./Results.jsx";
import NoEmail from '../noEmail.jsx'
import axios from 'axios'
import {questions} from '../../questions.js'
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      result: {
        EI: [],
        TF: [],
        SN: [],
        JP: []
      },
      email: "",
      renderingQuestions: true,
      modal:false
    };
    this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  onClick(e) {
    e.preventDefault();
    this.onSave()
  }

    onSave() {
     if(this.state.email !== ''){
       axios({
         url: "/results",
         method: "post",
         data: {
           email: this.state.email,
           result: this.state.result
         }
        }),
        this.setState({ renderingQuestions: false })
     } else{
      this.toggleModal()
    }
    }
  
  onSelect(e) {
    let updatedState = Object.assign({}, this.state.result);
    var newState = (function() {
      updatedState[e.target.id].push(Number(e.target.value));
      return updatedState;
    })();
    this.setState({ result: newState });
  }

  toggleModal(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className="app">
        {this.state.renderingQuestions ? (
          <div>
            <div className="main">
              <div className="DiscoverYourPers">
                <span className="Header">Discover Your Perspective</span>
              </div>
              <div className="CompleteThe7Min">
                <span>
                  {" "}
                  Complete the 7 min test and get a detailed report of your
                  lenses on the world.
                </span>
              </div>

              <div className="questionList">
                {questions.map(question => {
                  return (
                    <div>
                      <Question
                        question={question}
                        onSelect={this.onSelect}
                      />
                    </div>
                  );
                })}
                <Email onChange={this.handleChange} value={this.state.email} className={this.state.modal === false ? "emailForm" : "NoEmailForm"} />
              </div>
              <button className="divAroundSubmit" onClick={this.onClick}>
                {" "}
                Save & Continue{" "}
              </button>
            </div>
            <NoEmail modal={this.state.modal} toggle={this.toggleModal}/>
          </div>
        ) : (
          <div className="mainRes">
            <Results onClick={this.onClick} result={this.state.result} />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("test"));
