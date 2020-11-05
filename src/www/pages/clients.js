import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Beacon_realtime extends Component {
    constructor() {
        super();
        this.state = {
            tieto: [],
            response: "",
            tenant: "",
            endpoint: "http://127.0.0.1:4002",
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
                <p>The most recent change: 
                    { tenant.firstname } {tenant.lastname}  <b>{tenant.status}</b> <b>{tenant.location}</b>  {tenant.last_updated} </p>
                    <ul>
                    { this.state.tieto.map(t => 
                        <li key={ Math.floor(Math.random() * (10000 - 1) ) + 1 }>
                        { t.firstname } {t.lastname} <b>{t.status} </b> <b>{t.location }</b> {new Date(t.measurement_time).toLocaleString()}
                        </li>
                    )}
                    </ul>
            </div>
        )
    }
}

export default Beacon_realtime;
