import { Box, Button, Typography } from "@mui/material";
import { CompanySettings, useCompanySettingsByFamily } from "hooks/settings-hooks";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getSerializedValuesFromSession } from "../../utils/session-utils";
import SettingsModal from "./SettingsModal";

const handleSelectedSetting = ({setOpenModal, setCompanySettingsSelected}: any, { value, companyId }: any) => {
  setCompanySettingsSelected({ value, companyId });
  setOpenModal(true);
};

function SettingsPanel() {
  const session = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [companySettingsSelected, setCompanySettingsSelected] = useState({ value: 0, companyId: '' });
  const { familyId } = getSerializedValuesFromSession(session.data);
  const companySettings = useCompanySettingsByFamily({ familyId });
  if (session.status !== 'authenticated' || !companySettings?.data) return (<Box>Carregando...</Box>);
  return (
    <>
      <SettingsModal
        open={openModal}
        setOpen={setOpenModal}
        companySettings={companySettingsSelected}
      />
      <Box>
        { companySettings?.data.exchangeConfigs.map(
          (settings: CompanySettings) => (
            <Box key={settings.companyId}>
              <Typography>{ settings.companyName } | { settings.sellAveragePrice }</Typography>
              <Button onClick={() => handleSelectedSetting({
                setOpenModal,
                setCompanySettingsSelected },
                {
                  value: settings.sellAveragePrice,
                  companyId: settings.companyId,
                })}
              >
                X
              </Button>
            </Box>
        )) 
        }
      </Box>
    </>
  );
}

export default SettingsPanel;