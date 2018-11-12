import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');



class App extends Component {

  makeRequest(user) {
    return new Promise((resolve, reject) => {
      console.log(this.state)
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
      AWS_Region: 'Default',
      Auth_Type: 'Default',
      Profile: {},
      Access_Key: '',
      Secret_Key: '',
      STS_Token: '',
      Output_Type: ''
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
            </label>
            <select placeholder='Default, Profile, Keys' type="input" onChange={evt => {this.setState({Auth_Type:evt.target.value})}}>
            <option>
              Default
            </option>
            <option>  
              Profile
            </option>
            <option>
                Keys
            </option>
            </select>
            {this.state.Auth_Type === 'Default' && (<br></br>)
            }
            {this.state.Auth_Type === 'Keys' && (<div>
              <label>Access Key*</label>
                  <input type="password" name="Access_Key"  onChange={evt => {this.setState({Access_Key:evt.target.value})}}/>
              <br></br>
              <label>Secret Key*</label>
                  <input type="password" name="Secret_Key"  onChange={evt => {this.setState({Secret_Key:evt.target.value})}}/>
              <br></br>
              <label>STS Token</label>
                  <input type="password" name="STS_Token"  onChange={evt => {this.setState({STS_Token:evt.target.value})}}/>
              </div>)
            }
            {this.state.Auth_Type === 'Profile' && (<div>
              <label>Provide an array of profiles. Sorry, I should do this for you</label>
                  <input type="text" name="Profile"  onChange={evt => {this.setState({Profile:evt.target.value})}}/>
        
              </div>)
            }
            
            <label>
              Output Format
            </label>
            <select placeholder='Output selection' type="input" onChange={evt => {this.setState({Output_Type:evt.target.value})}}>
            <option>
              Table
            </option>
            <option>  
              JSON
            </option>
            <option>
              Noah Sucks
            </option>
            </select>
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
