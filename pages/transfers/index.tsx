import { Box } from "@mui/system";
import Header from "components/core/Header";
import SelectUserAndBtnCreate from "components/core/SelectUserAndBtnCreate";
import { useSession } from "next-auth/react";
import Signout from "pages/auth/signout";
import { useState } from "react";

function Transfers() {
  const session = useSession();
  const [openModal, setOpenModal] = useState(false);

  if (session.status === 'loading') return <h1>Carregando...</h1>;
  if (session.status === 'unauthenticated') return <Signout />;
  return(
    <>
      <Header title='Transferências' />
      <SelectUserAndBtnCreate setOpenModal={setOpenModal} />
      <Box>
        <h1>Página em construção...</h1>
      </Box>
    </>
  );
};

export default Transfers;
