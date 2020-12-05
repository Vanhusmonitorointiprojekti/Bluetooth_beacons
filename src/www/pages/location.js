//Implements what tenant location page could look like
import { Paper, Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Location extends Component {
    constructor() {
        super();
        this.state = {
            tieto: [],
            response: "",
            tenant: "",
            endpoint: "http://195.148.21.28:4002",
        };
    }

    componentDidMount() {
        fetch('https://www.vanhusmonitorointi.tk/statuses')
        .then((response) => response.json())
        .then(responseJson => {
            console.log('tieto', responseJson)
            this.setState({tieto: responseJson})

        })
        const { endpoint } = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("new", data => {
            let newArray = this.state.tieto.concat(data)
            this.setState({ tieto: newArray })
        })
        socket.on("updates", data => {
            let newArray = this.state.tieto.filter(t => t.tenant_id !== data.tenant_id).concat(data)
            console.log('tenant', data)
            this.setState({ tenant: data })
            this.setState({ tieto: newArray })
        })
    }

    render() {
        const tenant = this.state.tenant;

        return (
            <div style={{textAlign: "center"}}>
            <Paper style={{paddingLeft: '7%', paddingRight: '7%'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: "20px"}}>Asukas</TableCell>
                            <TableCell style={{fontSize: "20px"}}>Sijainti</TableCell>
                            <TableCell style={{fontSize: "20px"}}>Tila</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            { this.state.tieto.map(t => 
                                <TableRow key={ Math.floor(Math.random() * (10000 - 1) ) + 1 }>
                                    <TableCell>{ t.firstname } { t.lastname }</TableCell>
                                    <TableCell>{ t.location }</TableCell>
                                    <TableCell>{t.status}</TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </Paper>
            </div>
        )
    }
}

export default Location;
