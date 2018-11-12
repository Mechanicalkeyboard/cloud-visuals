import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

function getGreeting(user) {
  return new Promise((resolve, reject) => {

  axios.post('http://127.0.0.1:5000/list', {
      "aws": {
        "enabled": true,
        "regions": {
          "us-east-1": []
        },
        "auth": {
          "type": "profile",
          "profile names": [
            ""
          ]
        }
      },
      "output": {
        "enabled": true,
        "type": "json",
        "path": "../basic_table.html",
        "filter": {
          "service": [
            ".*__ci"
          ]
        }
      }
  })
    .then(function (response) {
      // handle success
      console.log(response.data[0].service)


    resolve(JSON.stringify(response.data[0].service));
      console.log("shit")

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    })
}
function myFunction(elm) {
  console.log("fuck this guy: " + elm)
}
function handleEntailmentRequest(event, data) {
  event.preventDefault();
  myFunction(data)
  console.log("handle request ");
}
class App extends Component {
  componentDidMount() {
   // fetch data and update state
   getGreeting("api").then(response => {this.setState({
                  response: response
              })
              console.log(JSON.stringify(this.state.response) + " : titties")}
            )
}
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      response:''
    };
  }
  render() {
    if(!this.state.response){
    console.log(this.state.response)
        return (
          <img src={logo} className="App-logo" alt="logo" />

        )
      }
    else
    return (

      <div className="App">
        <header> {this.state.response}</header>
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <form>
            <label>
              Name:
    <input type="text" name="name" />
            </label>
            <input type="input" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            <button onClick={(e) => {handleEntailmentRequest(e, this.state.inputValue)}}>hella cool button</button>
          </form>
          <p>
          {this.state.jonathan}
          </p>
        </header>
      </div>
    );
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    console.log(evt.target.value)
  }

}


export default App;
