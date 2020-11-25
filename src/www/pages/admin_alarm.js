import React, {Component} from "react";
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import socketIOClient from "socket.io-client";

class Admin_Alarm extends Component {


    render() {

        return (
            <div style={{textAlign: "center"}}>
                <Paper style={{paddingLeft: '7%', paddingRight: '7%'}}>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: '18px'}}>{("Aika")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Tila")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Asukas")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Sijainti")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Kuittaus aika")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Hoitaja")}</TableCell>

                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{color: 'red'}}>NYT</TableCell>
                            <TableCell style={{color: 'red'}}>Hälytys</TableCell>
                            <TableCell>Charles Darwin</TableCell>
                            <TableCell>Ulko-ovi</TableCell>
                            <TableCell> - </TableCell>
                            <TableCell> - </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color: 'orange'}}>12 min sitten</TableCell>
                            <TableCell style={{color: 'orange'}}>Kuitattu</TableCell>
                            <TableCell>Marie Curie</TableCell>
                            <TableCell>Aula</TableCell>
                            <TableCell> 10 min sitten </TableCell>
                            <TableCell> Matti Meikäläinen </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{color: 'green'}}>12:36</TableCell>
                            <TableCell style={{color: 'green'}}>Hoidettu / OK</TableCell>
                            <TableCell>Maria Goeppert-Mayer</TableCell>
                            <TableCell>A2</TableCell>
                            <TableCell> 12:40 </TableCell>
                            <TableCell> Anneli Aamu </TableCell>
                        </TableRow>
                        
                            
                    </TableBody>
                </Table>
                </Paper>
            </div>
        )
    }

}

export default Admin_Alarm;