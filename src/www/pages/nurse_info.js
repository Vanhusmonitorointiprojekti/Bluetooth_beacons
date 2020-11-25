import React, {Component} from "react";
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import socketIOClient from "socket.io-client";

class Nurse_Info extends Component {


    render() {

        return (
            <div style={{textAlign: "center"}}>
                <Paper style={{paddingLeft: '7%', paddingRight: '7%'}}>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize: '18px'}}>{("Hoitaja nimi")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Vuorossa")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Alue")}</TableCell>
                            <TableCell style={{fontSize: '18px'}}>{("Asukkaat")}</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Matti Meikäläinen</TableCell>
                            <TableCell style={{color: "green"}}>KYLLÄ <br/> 6:00 - 14:30</TableCell>
                            <TableCell>A1</TableCell>
                            <TableCell>Marie Curie <br/> Albert Einstein</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Anneli Aamu</TableCell>
                            <TableCell style={{color: "green"}}>KYLLÄ <br/> 6:00 - 14:30</TableCell>
                            <TableCell>A2</TableCell>
                            <TableCell>Maria Goeppert-Mayer <br/> Charles Darwin</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saana Saima</TableCell>
                            <TableCell style={{color: "green"}}>KYLLÄ <br/> 6:00 - 14:30</TableCell>
                            <TableCell>A3</TableCell>
                            <TableCell>Isaac Newton <br/> Karl Marx</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Minna Manninen</TableCell>
                            <TableCell style={{color: "green"}}>KYLLÄ <br/> 6:00 - 14:30</TableCell>
                            <TableCell>A4</TableCell>
                            <TableCell>Irène Joliot-Curie <br/> Stephen Hawking</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Simo Seppänen</TableCell>
                            <TableCell style={{color: "red"}}>EI <br/> 15:00 - 23:00</TableCell>
                            <TableCell>A1</TableCell>
                            <TableCell>Marie Curie <br/> Albert Einstein</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Paula Paananen</TableCell>
                            <TableCell style={{color: "red"}}>EI <br/> 15:00 - 23:00</TableCell>
                            <TableCell>A2</TableCell>
                            <TableCell>Maria Goeppert-Mayer <br/> Charles Darwin</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Teemu Teikäläinen</TableCell>
                            <TableCell style={{color: "red"}}>EI <br/> 22:30 - 6:30</TableCell>
                            <TableCell>YÖ</TableCell>
                            <TableCell>A1, A2, A3, A4</TableCell>
                        </TableRow>
                        
                            
                    </TableBody>
                </Table>
                </Paper>
            </div>
        )
    }

}

export default Nurse_Info;