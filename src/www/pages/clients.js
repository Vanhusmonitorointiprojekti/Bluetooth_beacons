import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Beacon_realtime extends Component {
    constructor() {
        super();
        this.state = {
            tieto: [],
            response: "",
            beacon: "",
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
        socket.on("updates", data => this.setState({ beacon: data }))
    }

    render() {
        const beacon = this.state.beacon;

        return (
            <div style={{textAlign: "center"}}>
                <p>The newest status change: { beacon.firstname } {beacon.lastname} {beacon.status} {beacon.last_updated} </p>
                    <ul>
                    { this.state.tieto.map(member => 
                        <li key={ member.lastname + Math.random(10) }>
                        { member.firstname } {member.lastname} {member.status} {member.last_updated}
                        </li>
                    )}
                    </ul>
            </div>
        )
    }
}

export default Beacon_realtime;
