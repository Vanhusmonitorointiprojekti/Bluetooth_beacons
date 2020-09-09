import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Beacon_realtime extends Component {
    constructor() {
        super();
        this.state = {
            response: "",
            beacons: {},
            endpoint: "http://127.0.0.1:4002",
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("broadcast", data => this.setState({ response: data.description }));
        socket.on("test", data => this.setState({ beacons: data }));
    }

    render() {
        const { response } = this.state;
        const beacons = this.state.beacons;

        return (
            <div style={{textAlign: "center"}}>
                      Number of clients: {response}
                      Beaconresponse: { beacons.beaconuser }
            </div>
        )
    }
}

export default Beacon_realtime;
