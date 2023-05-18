import { Box } from "@mui/material";
import Header from "components/core/Header";
import SettingsPanel from "components/settings/SettingsPanel";
import { useSession } from "next-auth/react";
import { getSerializedValuesFromSession } from "utils/session-utils";

function Settings () {
  const session = useSession();
  const { familyId } = getSerializedValuesFromSession(session.data);
  if (session.status !== 'authenticated') return (<Box>Carregando...</Box>);
  return (
    <>
      <Header title='Configurações' />
      <SettingsPanel familyId={familyId} />
    </>
  );
}

export default Settings;
