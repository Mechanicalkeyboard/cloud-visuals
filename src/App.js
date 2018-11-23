import React, {
  Component
} from 'react';
import Jimberly from './components/list'
import logo from './logo.svg';
import './App.css';
import 'react-table/react-table.css'
const axios = require('axios');


class App extends Component {
  makeRequest(user) {

    return new Promise((resolve, reject) => {
      // console.log(this.state)
      let body = {
        "aws": {
          "enabled": true,
          "regions": {
            "us-east-1":["jon", "paul"]
          },
          "auth": {
            "type": "default"
          }
        },
        "output": {
          "enabled": true,
          "type": "json"
        }
      };
      //Build the region object
      let region = {}
      region[this.state.AWS_Region]=[];
      //Add the region object to the body
      body['aws']['regions'] = region
      console.log('This is my body, I am not ashamed: '+ JSON.stringify(body))
      axios.post('http://10.210.235.189:5000/list', body)
        .then(response => {
          // handle success
          console.log(JSON.stringify(response.data[0].service))
          let tempData = this.state.data;
          tempData = response.data
           this.setState({
            data: tempData
          })
          console.log(this.state)
          resolve(JSON.stringify(response.data[0].service));
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          reject('Well, blame Noah, looks like the API is ded.');
          
        })
        .then(function () {
          // always executed
        });
    }, user)
  };

  handleEntailmentRequest(event, data) {
    // console.log(this.state)
    event.preventDefault();
    console.log(data)
    this.makeRequest(data).then(response => {
      this.setState({
        response: response
      })
      // console.log('API Response:  ' + JSON.stringify(this.state.response));
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
      Output_Type: 'Table',
      regions: [{ 'us-east-1': 
      ['default','jon2'] 
    }] ,
      clusters: [{ name: '' }],



      columns:
      [
        {
          id:'service',
          Header: 'Service Name',
          accessor: 'service'
        },
        {
          id:'cluster',
          Header: 'Cluster Name',
          accessor: 'cluster'
        },
        {
          id:'avg_uptime',
          Header:'Avg Uptime',
          accessor:'avg_uptime'
        },
        {
          id: 'desired_count',
          Header: 'Desired Count',
          accessor: 'desired_count'
        },
        {
          id: 'running_count',
          Header: 'Running Count',
          accessor: 'running_count'
        },
        {
          id: 'launch_type',
          Header: 'Launch Type',
          accessor: 'launch_type'
        },
        {
          id: 'max_uptime',
          Header: 'Max Uptime',
          accessor: 'max_uptime'
        }
      ],
      data: [
        {
          service:'jon',
          cluster:26,
          avg_uptime:'d',
          desired_count:1,
          running_count:2,
          launch_type:'fargate',
          max_uptime:'dffd'
        }
      ]
    };
  };
handleRegionNameChange = (idx) => (evt) => {
 
  const idxRegion = this.state.regions.map((region, sidx) => {
    if (idx !== sidx) {
      return region
    };
    let tempData = {}
    tempData[evt.target.value] = []
    return tempData;
  });
  this.setState({
    regions: idxRegion
  });
}

handleClusterNameChange = (idx) => (evt) => {
  for(var i=0; i<this.state.regions.length; i++){
    if(Object.keys(this.state.regions[i])[0]==='us-east-1'){
      let temp=this.state.regions
      temp[i]['us-east-1']=[evt.target.value]
      console.log(JSON.stringify(this.state.regions))
     
    
    this.setState({ regions : temp });
    }

  }

  const idxCluster = this.state.regions.map((cluster, sidx) => {
    if (idx !== sidx) return cluster;

    console.log(cluster)
    return { ...cluster, name: evt.target.value };
  });
  this.setState({ clusters: idxCluster });
}


handleAddRegion = () => {
  this.setState({
    regions: this.state.regions.concat([{ name: '' }])
  });
}
handleAddCluster = () => {
  this.setState({
    clusters: this.state.clusters.concat([{ name: '' }])
  });
}
handleRemoveCluster = (idx) => () => {
  this.setState({
    clusters: this.state.clusters.filter((s, sidx) => idx !== sidx)
  });
}
handleRemoveRegion = (idx) => () => {
  this.setState({
    regions: this.state.regions.filter((s, sidx) => idx !== sidx)
  });
}

  render() {
    if (this.state.response) {
      return ( 
        <div className = 'App'>
        <Jimberly data={this.state.data} columns={this.state.columns}/>
        <img src = {
            logo
          }
          className = 'App-logo'
          alt = 'logo' />

          </div>
        )
      }
    else
    return (
<div className='App'>
   <form>
      {/* ... */}
      <h4>Regions</h4>
      {
        this.state.regions.map((region, idx) => (
      <div className="region">
         <p className='dingus'> 
            <button type="button" onClick={this.handleRemoveRegion(idx)} className="small">X</button>
            <input
               type="text"
               placeholder={`Region`}
               value={Object.keys(region)}
               onChange={this.handleRegionNameChange(idx)}
               />
            {/* Cluster Management */}
            {this.state.clusters.map((cluster, idx) => (
            <span>
            <input
            type="text"
            placeholder={`Cluster #${idx + 1} name`}
            value={cluster.name}
            onChange={this.handleClusterNameChange(idx)}
            />  
            <button type="button" onClick={this.handleRemoveCluster(idx)} className="small">X</button>
            </span>         
            ))}               
            <button type="button" onClick={this.handleAddCluster} className="small">Cluster</button>  
         </p>
         <br />
      </div>
      ))}
      <button type="button" onClick={this.handleAddRegion} className="small">Add Another Region</button>  
   </form>
   <header className='App-header'>
      <h2>
         Cloud Insights
      </h2>
   </header>
   <div className='warn'>
      * indicates Required field
   </div>
   <h4 className='dingus'> 
      Inputs
   </h4>
   <form>
      <label>
      AWS Region:
      <input className='longInput' placeholder='Default Uses All Regions' tooltip='eg. us-east-1' type='text' name='AWS_Region'  onChange={evt => {this.setState({AWS_Region:evt.target.value})}}/>
      </label>
      <br></br>
      <label>
      Authentication Type:
      </label>
      <select placeholder='Default, Profile, Keys' type='input' onChange={evt =>
         {this.setState({Auth_Type:evt.target.value})}}>
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
      {this.state.Auth_Type === 'Keys' && (
      <div>
         <label>Access Key*</label>
         <input type='password' name='Access_Key'  onChange={evt => {this.setState({Access_Key:evt.target.value})}}/>
         <br></br>
         <label>Secret Key*</label>
         <input type='password' name='Secret_Key'  onChange={evt => {this.setState({Secret_Key:evt.target.value})}}/>
         <br></br>
         <label>STS Token</label>
         <input type='password' name='STS_Token'  onChange={evt => {this.setState({STS_Token:evt.target.value})}}/>
      </div>
      )
      }
      {this.state.Auth_Type === 'Profile' && (
      <div>
         <label>Provide an array of profiles. Sorry, I should do this for you</label>
         <input type='text' name='Profile'  onChange={evt => {this.setState({Profile:evt.target.value})}}/>
      </div>
      )
      }
      <h4 className='dingus'>
         Outputs
      </h4>
      <label >
      Output Format
      </label>
      <select placeholder='Output selection' type='input' onChange={evt =>
         {this.setState({Output_Type:evt.target.value})}}>
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
      <br></br>
      <br></br>
      <button onClick={(e) => {this.handleEntailmentRequest(e, this.state.AWS_Region)}}>Submit</button>
      <br></br>
      <br></br>
      <br></br>
   </form>
   <h4 className='dingus'>
      About Us
   </h4>
   <div>
      <a
         className='App-link'
         href='https://www.github.com/noahjohnhay/cloud-insight'
         target='_blank'
         rel='noopener noreferrer'
         >
      To contribute or view source code for sever click here
      </a>
   </div>
   <div>
      <a 
         className='App-link'
         href='https://www.github.com/mechanicalkeyboard/cloud-visuals'
         target='_blank'
         rel='noopener noreferrer'
         >
      To laugh at the front-end code click here
      </a>
   </div>
</div>
    );
  }
}


export default App;
