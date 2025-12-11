import "./App.css";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import BasicTable from "./table";
import main from "./ticket";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(false);
  // const [dataMembers, setDataMembers] = React.useState([{name: "A", amount: 200},{name: "B", amount: 300},{name: "C", amount: 1000},{name: "B", amount: 1000}]);
  const [dataMembers, setDataMembers] = React.useState([]);
  const [member, setMember] = React.useState({name: "", amount: 0});
  const [debts, setDebts] = React.useState([])

  console.log(dataMembers);
  React.useEffect(() => {
    const membersArray = dataMembers.map(member =>Object.assign({}, member))
    setDebts(main(membersArray))
  }, [dataMembers])
  
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setMember({name: "", amount: 0})
    setOpen(false)};
  const handleDataChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    if(name === "amount") value = Number(value)
    setMember({...member,[name]:value})
  }
  const  handleSaveMember = (e) =>{
    e.preventDefault()
    const existMember = dataMembers.filter(mem=> mem.name === member.name)
    if(existMember.length>0){
      const existingMember = dataMembers.map(mem=>{
        if(mem.name === member.name){
          return member
        }
        return mem
      })
      setDataMembers(existingMember)
    }else{
      setDataMembers([...dataMembers,member])
    }
    setMember({name: "", amount: 0})
    setOpen(false);
  }
  const handleEdit = (member) =>{
    setMember({name: member.name, amount:member.amount})
    setOpen(true);

  }
  const handleDelete = (member) =>{
    const result = dataMembers.filter(mem=>mem.name !== member.name)
    console.log(result);
    setDataMembers(result)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleOpen} variant="contained">
          Agregar Pibe / a
        </Button>
        <BasicTable edit={handleEdit} members={dataMembers} debts = {debts} deleteHandle={handleDelete} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box xs={12} sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Pibe / a
            </Typography>
            <TextField
              style={{ width: "100%", margin: "10px 0px" }}
              id="filled-basic"
              label="Nombre"
              name="name"
              value={member.name}
              variant="filled"
              onChange={e=>handleDataChange(e)}
            />
            <TextField
              style={{ width: "100%", margin: "10px 0px" }}
              type="number"
              inputProps={{ min: 0 }}
              name="amount"
              id="filled-basic"
              label="Monto"
              value={member.amount}
              variant="filled"
              onChange={e=>handleDataChange(e)}

            />
            <Button
              style={{ margin: "10px 0px" }}
              onClick={handleSaveMember}
              variant="contained"
            >
              Aceptar
            </Button>
          </Box>
        </Modal>
      </header>
    </div>
  );
}

export default App;
