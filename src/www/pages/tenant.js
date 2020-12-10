import React, {Component} from "react";
import { Paper, Table, TableRow, TableHead, TableCell, TableBody, Avatar } from '@material-ui/core';
import socketIOClient from "socket.io-client";
import user1 from './user_img/beaconuser1.jpg';
import user2 from './user_img/beaconuser2.jpg';
import user3 from './user_img/beaconuser3.jpg';
import user4 from './user_img/beaconuser4.jpg';
import user5 from './user_img/beaconuser5.jpg';

class Tenant extends Component {


    render() {

        return (
            <div style={{textAlign: "center"}}>
                <Paper style={{paddingLeft: '7%', paddingRight: '7%'}}>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: '18px'}}>{("Asukkaan nimi")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Profiili")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Kotipesä")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Huone")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Tila")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Hoitaja")}</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><Avatar src={user3}/>Marie Curie</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>A1</TableCell>
                            <TableCell>Huone 2</TableCell>
                            <TableCell style={{color: "green"}}>OK</TableCell>
                            <TableCell>Matti Meikäläinen</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Avatar src={user2}/>Alber Einstein</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>A1</TableCell>
                            <TableCell>Huone 5</TableCell>
                            <TableCell style={{color: "green"}}>OK</TableCell>
                            <TableCell>Anneli Aamu</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Avatar src={user5}/>Maria Goeppert-Mayer</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>A2</TableCell>
                            <TableCell>Huone 1</TableCell>
                            <TableCell style={{color: "green"}}>OK</TableCell>
                            <TableCell>Saana Saima</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Avatar src={user4}/>Charles Darwin</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>A2</TableCell>
                            <TableCell>Huone 3</TableCell>
                            <TableCell style={{color: "red"}}>Hälytys</TableCell>
                            <TableCell>Minna Manninen</TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
                </Paper>
            </div>
        )
    }

}

export default Tenant;