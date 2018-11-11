import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

function getGreeting(user) {
  axios.get('127.0.0.1:5000/list')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  if (user) {
    return <h1>Hello, {user}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
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
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  render() {
    return (
      <div className="App">
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            {getGreeting("jonathan").then}
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
