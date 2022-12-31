import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  root: {
    tableLayout: "fixed",
    whiteSpace: "nowrap",
  },
});


export default function BasicTable(props) {
  const { members , debts, edit, deleteHandle} = props;
  const [totalAmount, setTotalAmount] = React.useState(0)
 
  React.useEffect(() => {

    const totalAmount = members.reduce((acc, member) => acc+member.amount,0)
    setTotalAmount(totalAmount)
  }, [members])
  const getDebts = (member) =>{
    const result = debts.filter(debt => debt.from === member.name).map((element)=>{return (<p>De {element.from} a {element.to} : ${element.amount} </p>)})
    return result
  }
  const classes = useStyles();
  // const handleMembersDataChange = () =>{

  // }
  const handleOpen = (e,member) => {
    e.preventDefault()
    edit(member)
  }
  const handleDelete = (e,member) => {
    e.preventDefault()
    deleteHandle(member)
  }

  return (
    <TableContainer
      xs={{ margin: "3px" }}
      sx={{ marginTop: "10px" }}
      component={Paper}
    >
      <Table className={classes.root} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "10px", minWidth: "20px" }}
              align="center"
            >
              Monto por persona
            </TableCell>
            <TableCell style={{ width: "10px" }} align="center">
             $ {isNaN(totalAmount/members.length) ? 0 : totalAmount/members.length}
            </TableCell>
            <TableCell style={{ width: "10px" }} align="center"></TableCell>
            <TableCell style={{ width: "10px" }} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "10px", minWidth: "20px" }}
              align="center"
            >
              Nombre
            </TableCell>
            <TableCell style={{ width: "10px" }} align="center">
              Monto pagado
            </TableCell>
            <TableCell style={{ width: "10px" }} align="center">
              Monto a pagar
            </TableCell>
            <TableCell style={{ width: "10px" }} align="center">
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => {
            return (
              <TableRow key = {Math.random()}>
                <TableCell align="center">{member.name}</TableCell>
                <TableCell align="center">$ {member.amount}</TableCell>
                <TableCell align="center">{
                  getDebts(member)
                }</TableCell>
                <TableCell align="center">
                  <Grid container>
                    <Grid xs={6} item>
                      <Button onClick={e=>handleOpen(e,member)}>
                      <EditIcon/>
                      </Button>
                    </Grid>
                    <Grid xs={6}  item>
                    <Button onClick={e=>handleDelete(e,member)}>
                      <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
