import { Paper, Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Beacon_realtime extends Component {
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
        fetch('http://localhost:4000/statuses')
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
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Asukas</TableCell>
                            <TableCell>Sijainti</TableCell>
                            <TableCell>Tila</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
        <TableCell>{ tenant.firstname } { tenant.lastname }</TableCell>
                            <TableCell>{ tenant.location }</TableCell>
                            <TableCell>{ tenant.status }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            </div>
        )
    }
}

export default Beacon_realtime;
