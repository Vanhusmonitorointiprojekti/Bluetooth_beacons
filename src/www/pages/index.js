import React, { Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Beacon_detections from './beacon_detections.js';
import Receiver_info from './receiver_info.js';
import Beacon_info from './beacon_info.js';
import Beacon_locations from "./beacon_locations";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'

class AdminFrontPage extends Component{
  constructor(props){
    super(props);
    this.state = {value: 0};
  }

handleChange = (event, val) => {
  this.setState( {value: val});
}



render(){
  return(
<div>
  <BrowserRouter>
    <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Link to="/"><Tab label="Beacon info"  /></Link>
            <Link to="/BeaconDetections"><Tab label="Beacon detections" /></Link>
            <Link to="/ReceiverInfo"><Tab label="Receiver info" /></Link>
            <Link to="/BeaconLocations"><Tab label="Beacon locations" /></Link>
           
          </Tabs>
          
        </AppBar>
      </div>
      <div>
                        <Switch>
                            <Route exact path="/" component={Beacon_info}></Route>
                            <Route path="/BeaconDetections" component={Beacon_detections}></Route>
                            <Route path="/ReceiverInfo" component={Receiver_info}></Route>
                            <Route path="/BeaconLocations" component={Beacon_locations}></Route>

                        </Switch>
                    </div>
      </BrowserRouter>
    </div>
  )
}
}

export default AdminFrontPage;