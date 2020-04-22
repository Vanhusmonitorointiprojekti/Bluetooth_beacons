import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

class Receiver_info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


    componentDidMount = () => {
        fetch('http://localhost:4000/receiver_info')
        .then((response) => response.json())
        .then(responseJson => {
            this.setState({tieto: responseJson})
            
        })
        
            
        }

render() {
    const { t, i18n } = this.props;
        return (
            <div style={{paddingLeft: '20%', paddingRight: '20%', paddingTop:'1%'}}>
               
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Receiver ID")}</TableCell>
                            <TableCell>{t("Receiver Location")}</TableCell>
                            <TableCell>{t("Location Type")}</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tieto.map(member =>
                            <TableRow key={member.receiver_id}>
                            <TableCell>{member.receiver_id}</TableCell>
                            <TableCell>{member.receiver_location}</TableCell>
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

export default (withTranslation("translation"))(Receiver_info);