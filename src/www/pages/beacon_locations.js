import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import socketIOClient from "socket.io-client";
import { withTranslation } from 'react-i18next';

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
        fetch("http://localhost:4000/beacon_locations")
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




render() {
    const { t, i18n } = this.props;
        return (
            <div>
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Beacon ID")}</TableCell>
                            <TableCell>{t("Receiver ID")}</TableCell>
                            <TableCell>{t("Signal DB")}</TableCell>
                            <TableCell>{t("Time")}</TableCell>
                            <TableCell>{t("Location Type")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tieto.map(member =>
                            <TableRow key={member.beacon_user}>
                            <TableCell>{member.beacon_user}</TableCell>
                            <TableCell>{member.receiver_location}</TableCell>
                                {member.location_type === 'red' &&
                                <TableCell style={{backgroundColor: 'red'}}>{member.signal_db}</TableCell>
                                }
                                {member.location_type === 'yellow' &&
                                <TableCell style={{backgroundColor: 'yellow'}}>{member.signal_db}</TableCell>
                                }
                                {member.location_type === 'green' &&
                                <TableCell style={{backgroundColor: 'green'}}>{member.signal_db}</TableCell>
                                }

                            <TableCell>{member.timediff_in_seconds}</TableCell>
                            {member.location_type === 'red' &&
                            <TableCell style={{backgroundColor: 'red'}}>{member.location_type}</TableCell>
                            }
                            {member.location_type === 'yellow' &&
                            <TableCell style={{backgroundColor: 'yellow'}}>{member.location_type}</TableCell>
                            }
                            {member.location_type === 'green' &&
                            <TableCell style={{backgroundColor: 'green'}}>{member.location_type}</TableCell>
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