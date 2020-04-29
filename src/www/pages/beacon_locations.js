import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody, Avatar } from '@material-ui/core';
import socketIOClient from "socket.io-client";
import { withTranslation } from 'react-i18next';
import Photo from './beacon_user1.PNG';

class Beacon_locations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: [],
            endpoint: "http://127.0.0.1:4001",

            warning: [],
            newWarning: ''
        }
    }


    componentDidMount() {
        fetch("http://localhost:4000/beacon_locations_average")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ tieto: responseJson });

                const { endpoint } = this.state;
                const socket = socketIOClient(endpoint);
                socket.on("emitSocket", data => this.setState({ tieto: data }));
            });

    }

// Not implemented as of now / placeholder for creating history of warnings

    testWarnings = (e) => {

        if (this.state.tieto[0].signal_db < -59) {
           this.setState({warning: [...this.state.warning, this.state.tieto[0]]})

        }

        else if (this.state.tieto[1].signal_db < -59) {
            this.setState({warning: [...this.state.warning, this.state.tieto[1]]})

        }

        else if (this.state.tieto[2].signal_db < -59) {
            this.setState({warning: [...this.state.warning, this.state.tieto[2]]})

        }

     //   console.log(this.state.warning)
     //   console.log(this.state.tieto)

    }

  /*  testAlert = () => {
        if (this.state.tieto[0].location_type === "green"){
        alert("User " + this.state.tieto[0].beacon_user + " has entered the " +this.state.tieto[0].location_type + " room at: " + this.state.tieto[0].measument_time.substring(11,19))
        }
        else if (this.state.tieto[1].location_type === "green"){
            alert("User " + this.state.tieto[1].beacon_user + " has entered the " +this.state.tieto[1].location_type + " room at: " + this.state.tieto[1].measument_time.substring(11,19))
        }
        else if (this.state.tieto[2].location_type === "green"){
            alert("User " + this.state.tieto[2].beacon_user + " has entered the " +this.state.tieto[2].location_type + " room at: " + this.state.tieto[2].measument_time.substring(11,19))
        }
    }*/


render() {
    const { t, i18n } = this.props;
        return (
            <div style={{paddingLeft: '20%', paddingRight: '20%', paddingTop:'1%'}}>
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>{t("Beacon ID")}</TableCell>
                            <TableCell>{t("Receiver ID")}</TableCell>
                            <TableCell>{t("Time")}</TableCell>
                            <TableCell>{t("Status")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tieto.map(member =>
                            <TableRow key={member.beacon_user}>
                                <TableCell><Avatar src={Photo}/></TableCell>
                                {member.status === 'Alarm' &&
                                <TableCell style={{backgroundColor: 'red'}}>{member.beacon_user}</TableCell>
                                }
                                {member.status === 'Unsure' &&
                                <TableCell style={{backgroundColor: 'yellow'}}>{member.beacon_user}</TableCell>
                                }
                                {member.status === 'OK' &&
                                <TableCell style={{backgroundColor: 'green'}}>{member.beacon_user} </TableCell>
                                }

                                {member.status === 'Alarm' &&
                                <TableCell style={{backgroundColor: 'red'}}>{member.receiver_location}</TableCell>
                                }
                                {member.status === 'Unsure' &&
                                <TableCell style={{backgroundColor: 'yellow'}}>{member.receiver_location}</TableCell>
                                }
                                {member.status === 'OK' &&
                                <TableCell style={{backgroundColor: 'green'}}>{member.receiver_location} </TableCell>
                                }


                                {member.status === 'Alarm' &&
                                <TableCell style={{backgroundColor: 'red'}}>{member.timediff_in_seconds}</TableCell>
                                }
                                {member.status === 'Unsure' &&
                                <TableCell style={{backgroundColor: 'yellow'}}>{member.timediff_in_seconds}</TableCell>
                                }
                                {member.status === 'OK' &&
                                <TableCell style={{backgroundColor: 'green'}}>{member.timediff_in_seconds}</TableCell>
                                }


                        

                            {member.status === 'Alarm' &&
                            <TableCell style={{backgroundColor: 'red'}}>{member.status}</TableCell>
                            }
                            {member.status === 'Unsure' &&
                            <TableCell style={{backgroundColor: 'yellow'}}>{member.status}</TableCell>
                            }
                            {member.status === 'OK' &&
                            <TableCell style={{backgroundColor: 'green'}}>{member.status} </TableCell>
                            }
                            
                            </TableRow>
                            )}                            
                    </TableBody>
                </Table>
                </Paper>                
            </div>      
        );
    }
}

const styles =  {
    buttonStyle: {
        width: 80,
        height: 80
    },
    headerStyle: {
        textAlign: 'center'
    }
        
} ;

export default (withTranslation("translation"))(Beacon_locations);