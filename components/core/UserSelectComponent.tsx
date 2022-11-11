import { MenuItem, Select } from "@mui/material";
import { GeneralContext } from "context/GeneralContext";
import { useUsersByFamily } from "hooks/users-hooks";
import { useContext } from "react";

function UserSelectComponent() {
  const { selectedUserName, setSelectedUserName, session: { familyId, name } } = useContext(GeneralContext);
  const familyUsers = useUsersByFamily({ familyId, name });

  return (
    <Select
      value={!!familyUsers.data ? selectedUserName : ''}
      onChange={(event) => setSelectedUserName(event.target.value)}
      sx={{ m: 2, ml: 4 }}
    >
      {familyUsers.data?.users.map(
        (user: any) => <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)
      }
    </Select> 
  );
}

export default UserSelectComponent;
