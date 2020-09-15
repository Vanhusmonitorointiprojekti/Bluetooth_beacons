import React, {Component} from "react";
import socketIOClient from "socket.io-client";


class Beacon_realtime extends Component {
    constructor() {
        super();
        this.state = {
            tieto: [],
            response: "",
            beacons: "",
            endpoint: "http://127.0.0.1:4002",
        };
    }

    componentDidMount() {
        fetch('http://localhost:4000/test')
        .then((response) => response.json())
        .then(responseJson => {
            console.log('tieto', responseJson.result)
            this.setState({tieto: responseJson.result})

        })
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
                      <p>Number of socketio clients: {response} </p>
                      <p>The newest beacon_user value, if db changes: { beacons.beacon_user } </p>
                      <ul>
                          { this.state.tieto.map(member => 
                              <li key={member.beacon_id}>
                                  {member.beacon_user}
                              </li>
                        )}
                      </ul>
            </div>
        )
    }
}

export default Beacon_realtime;
