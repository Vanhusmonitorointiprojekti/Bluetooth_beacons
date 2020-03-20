import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';


class Beacon_detections extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


    componentDidMount = () => {
        fetch('http://localhost:4000/beacon_detections')
        .then((response) => response.json())
        .then(responseJson => {
            this.setState({tieto: responseJson})
            
        })
        
            
        }

render() {
        return (
            <div>
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Receiver ID</TableCell>
                            <TableCell>Beacon ID</TableCell>
                            <TableCell>Signal DB</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tieto.map(member =>
                            <TableRow key={member.measument_time}>
                            <TableCell>{member.receiver_id}</TableCell>
                            <TableCell>{member.beacon_id}</TableCell>
                            <TableCell>{member.signal_db}</TableCell>
                            <TableCell>{member.measument_time}</TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
                </Paper>

            </div>


           
        );
    }


}

export default Beacon_detections;