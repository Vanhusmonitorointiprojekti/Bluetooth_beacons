import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Beacon_realtime extends Component {
    constructor() {
        super();
        this.state = {
            response: '',
            endpoint: "http://127.0.0.1:4002"
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("test", data => this.setState({response: data[0][0].beaconuser}));
    }

    render() {
        const {response} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                Saatu vastaus: {response}
            </div>
        )
    }
}

export default Beacon_realtime;
