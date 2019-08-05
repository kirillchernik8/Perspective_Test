import React, { Component } from "react";
import ReactDOM from "react-dom";
import Question from "./Question.jsx";
import Email from "./Email.jsx";
import Results from "./Results.jsx";
import NoEmail from '../noEmail.jsx'
import { callbackify } from "util";
import axios from 'axios'

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
        }, ()=>this.setState({ renderingQuestions: false }))
        // .catch(err=>console.error(err))
       
     } else{
       this.setState({ modal: true})
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

  render() {
    const questions = [
      {
        question:
          "You find it takes effort to introduce yourself to other people.",
        type: "EI",
        id: 1
      },
      {
        question: "You consider yourself more practical than creative.",
        type: "SN",
        id: 2
      },
      {
        question:
          "Winning a debate matters less to you than making sure no one gets upset.",
        type: "TF",
        id: 3
      },
      {
        question:
          "You get energized going to social events that involve many interactions.",
        type: "EI",
        id: 4
      },
      {
        question:
          "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
        type: "SN",
        id: 5
      },
      {
        question:
          "Deadlines seem to you to be of relative rather than absolute importance.",
        type: "JP",
        id: 6
      },
      {
        question:
          "Logic is usually more important than heart when it comes to making important decisions.",
        type: "TF",
        id: 2
      },
      {
        question: "Your home and work environments are quite tidy.",
        type: "JP",
        id: 7
      },
      {
        question: "You do not mind being at the center of attention.",
        type: "EI",
        id: 8
      },
      {
        question:
          "Keeping your options open is more important than having a to-do list.",
        type: "JP",
        id: 9
      }
    ];

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
                        onSelect={this.onSelect.bind(this)}
                      />
                    </div>
                  );
                })}
                <Email onChange={this.handleChange} value={this.state.email} />
                <NoEmail modal={this.state.modal} toggle={this.onSave}/>
              </div>
              <button className="divAroundSubmit" onClick={this.onClick}>
                {" "}
                Save & Continue{" "}
              </button>
            </div>
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
