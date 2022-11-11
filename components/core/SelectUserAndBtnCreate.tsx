import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import UserSelectComponent from "./UserSelectComponent";

type SelectUserAndBtnCreateTypes = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

function SelectUserAndBtnCreate({ setOpenModal }: SelectUserAndBtnCreateTypes) {
  return(
    <Box width='100vw' display='flex' sx={{ justifyContent: 'space-between' }}>
      <UserSelectComponent />
      <Button 
        variant='contained' 
        sx={{ m: 2, mr: 4, width: '120px', fontWeight: 'bolder', backgroundColor: 'gray' }}
        onClick={ () => setOpenModal(true)}
      >
        Criar
      </Button>
     </Box>
  );
}

export default SelectUserAndBtnCreate;
