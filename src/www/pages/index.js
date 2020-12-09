import React, { Component, useEffect, Image } from 'react';
import { AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";

import Beacon_info from './beacon_info.js';
import flag_UK from '../../locales/en/flag_UK.png'
import flag_FI from '../../locales/fi/flag_FI.png'
import Nurse_info from './nurse_info';
import Admin_alarm from './admin_alarm';
import Locations from './location';
import Tenant from './tenant';

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

switchEn = () => {
  this.setState({isEnglish: true});
  this.props.i18n.changeLanguage("en");
}

switchFi = () => {
  this.setState({isEnglish: false});
  this.props.i18n.changeLanguage("fi")
}


render(){
  const { t, i18n } = this.props;
  return(
  <div>
    <BrowserRouter>
    <div style={{paddingLeft: '0%', paddingRight: '0%'}}>
          <AppBar position="static">
            <Tabs value={this.state.activeTab} onChange={this.handleActiveTabChange}>
              <Tab style={{fontSize: '22px', marginLeft: '5%'}} label={t("Beacon info")} component={Link} to="/"/>
              <Tab style={{fontSize: '22px', marginLeft: '5%'}} label={t("Nurse info")} component={Link} to="/Nurse"/>
              <Tab style={{fontSize: '22px', marginLeft: '5%'}} label={t("Alarm")} component={Link} to="/Admin_alarm"/>
              <Tab style={{fontSize: '22px', marginLeft: '5%'}} label={t("Locations")} component={Link} to="/Locations"/>
              <Tab style={{fontSize: '22px', marginLeft: '5%'}} label={t("Tenants")} component={Link} to="/Tenant"/>
              <Button style={{marginLeft: "auto"}} onClick={this.switchEn}><img src= {flag_UK} alt="FlagOfUK" height='25' width='40' /></Button>
              <Button onClick={this.switchFi}><img src= {flag_FI} alt="FlagOfFI" height='25' width='40' /></Button>

            </Tabs>

          </AppBar>
        </div>
        <div>
                          <Switch>
                              <Route exact path="/" component={Beacon_info}></Route>
                              <Route path="/Nurse" component={Nurse_info}></Route>
                              <Route path="/Admin_alarm" component={Admin_alarm}></Route>
                              <Route path="/Locations" component={Locations}></Route>
                              <Route path="/Tenant" component={Tenant}></Route>
                          </Switch>
                      </div>
        </BrowserRouter>
      </div>
  )
}
}

export default (withTranslation("translation"))(AdminFrontPage);