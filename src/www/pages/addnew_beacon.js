//Not complete/working
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import axios from 'axios';

import { withTranslation } from "react-i18next";




class AddBeacon extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tieto: [],
            user: '', id: ''
        }
    }

    add_beacon = (e) => {
        const formData = new FormData();
        formData.append('user', this.state.user);
        formData.append('id', this.state.id);

        if (this.state.user === '' || this.state.user.match(/^ *$/) || this.state.id === '' || this.state.id.match(/^ *$/)) {
            alert('Beacon user tai Beacon ID ei voi olla tyhjä')
        }
        else 

        axios.post('http://localhost:4000/new_beacon', formData)
    }

    changeData = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount = () => {
        fetch('http://localhost:4000/beacon_info')
        .then((response) => response.json())
        .then(responseJson => {
            this.setState({tieto: responseJson})
            
        })
        }

render(){
    const { t, i18n } = this.props;
    return (   
        <div>           
                        
                        <TextField label={t('Beacon User')} name='user' onChange = {this.changeData}/>
                        <TextField label={t('Beacon ID')} name='id' onChange = {this.changeData}/>
                        <Button onClick={this.add_beacon}>{t("Add New")}</Button>
                        </div>  
                );
        }
    }

export default (withTranslation("translation"))(AddBeacon);