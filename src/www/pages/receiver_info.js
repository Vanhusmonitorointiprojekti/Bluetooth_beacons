import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';

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
        return (
            <div>
               
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Receiver ID</TableCell>
                            <TableCell>Receiver Location</TableCell>
                            <TableCell>Location type</TableCell>
                            
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

export default Receiver_info;