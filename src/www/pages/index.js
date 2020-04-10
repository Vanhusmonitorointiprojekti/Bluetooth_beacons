import React, { Component, useEffect} from 'react';
import { AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";

import Receiver_info from './receiver_info.js';
import Beacon_info from './beacon_info.js';
import Beacon_locations from "./beacon_locations";

class AdminFrontPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeTab: 0,
      isEnglish: true
    };
    this.switchEn = this.switchEn.bind(this);
    this.switchFi = this.switchFi.bind(this);

  }

handleActiveTabChange = (event, val) => {
  this.setState( {activeTab: val});
}

/*handleClick() {
  this.setState(state => ({
    isEnglish: !state.isEnglish
  }));
} 
*/

switchEn = () => {
  this.setState({isEnglish: true});
  this.props.i18n.changeLanguage("en");
}

switchFi = () => {
  this.setState({isEnglish: false});
  this.props.i18n.changeLanguage("fi")
}


/*
toggleLang = event => {
  console.log("selected language is ", event.target.value);
  let newlang = event.target.value;
  this.setState(prevState => ({ language: newlang}));
  console.log("state value is ", newlang);
  this.props.i18n.changeLanguage(newlang);
}
*/


render(){
  const { t, i18n } = this.props;
  return(
  <div>
    <BrowserRouter>
      <div>
          <AppBar position="static">
            <Tabs value={this.state.activeTab} onChange={this.handleActiveTabChange}>
              <Tab label={t("Beacon info")} component={Link} to="/"/>
              <Tab label={t("Receiver info")} component={Link} to="/ReceiverInfo" />
              <Tab label={t("Beacon locations")} component={Link} to="/BeaconLocations" />
              <Button onClick={this.switchEn}>EN</Button>
              <Button onClick={this.switchFi}>FI</Button>
            </Tabs>
            
          </AppBar>
        </div>
        <div>
                          <Switch>
                              <Route exact path="/" component={Beacon_info}></Route>
                              <Route path="/ReceiverInfo" component={Receiver_info}></Route>
                              <Route path="/BeaconLocations" component={Beacon_locations}></Route>

                          </Switch>
                      </div>
        </BrowserRouter>
      </div>
  )
}
}

export default (withTranslation("translation"))(AdminFrontPage);