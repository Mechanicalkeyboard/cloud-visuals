import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');



class App extends Component {

  makeRequest(user) {
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
          reject("Well, blame Noah, looks like the API is ded.");
          
        })
        .then(function () {
          // always executed
        });
    })
  };

  handleEntailmentRequest(event, data) {
    console.log(this.state)
    event.preventDefault();
    this.makeRequest(data).then(response => {
      this.setState({
        response: response
      })
      console.log("API Response:  " + JSON.stringify(this.state.response));
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      AWS_Region: 'default',
      Auth_Type: 'default',
      Profile: {},
      Auth_Keys: {
        Access_Key: '',
        Secret_Key: '',
        STS_Token: ''
      },
    };
  }
  render() {
    if(this.state.response){
    console.log(this.state.response)
        return (
          <img src={logo} className="App-logo" alt="logo" />

        )
      }
    else
    return (

      <div className="App">
        <header className="App-header">
          <h2>
            Cloud Insights
          </h2>
          </header>
          <form>
            <div className="App-link">
              * indicates Required field
            </div>
            <label>
              AWS Region:
            <input placeholder="Default Uses All Regions" tooltip="eg. us-east-1" type="text" name="AWS_Region"  onChange={evt => {this.setState({AWS_Region:evt.target.value})}}/>
            </label>
            <br></br>
            <label>
            Authentication Type:
            <input placeholder='default, profile, keys' type="input" onChange={evt => {this.setState({Auth_Type:evt.target.value})}} />
            </label>
            <br></br>
            
            <button onClick={(e) => {this.handleEntailmentRequest(e, this.state.inputValue)}}>Submit</button>
         
         
         
         
          </form>




          <div>
          <a
            className="App-link"
            href="https://www.github.com/noahjohnhay/cloud-insight"
            target="_blank"
            rel="noopener noreferrer"
          >
            To contribute or view source code for sever click header
          </a>
          </div>
          <div>
          <a 
            className="App-link"
            href="https://www.github.com/mechanicalkeyboard/cloud-visuals"
            target="_blank"
            rel="noopener noreferrer"
          >
            To laugh at the front-end code click here
          </a>
          </div>
        
      </div>
    );
  }
}


export default App;
