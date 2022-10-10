import { Box, Button, Typography } from "@mui/material";
import { CompanySettingsFromApi, useCompanySettingsByFamily } from "hooks/settings-hooks";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getSerializedValuesFromSession } from "../../utils/session-utils";
import SettingsModal from "./SettingsModal";

export type CompanySettings = {
  value: number;
  companyId: string;
  settingsId: string;
}

const handleSelectedSetting = ({setOpenModal, setCompanySettingsSelected}: any,
  { value, companyId, settingsId }: CompanySettings) => {
  setCompanySettingsSelected({ value, companyId, settingsId });
  setOpenModal(true);
};

function SettingsPanel() {
  const session = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [companySettingsSelected, setCompanySettingsSelected] = useState<CompanySettings>({
    value: 0, companyId: '', settingsId: '',
  });
  const { familyId } = getSerializedValuesFromSession(session.data);
  const companySettings = useCompanySettingsByFamily({ familyId });
  if (session.status !== 'authenticated' || !companySettings?.data) return (<Box>Carregando...</Box>);
  return (
    <>
      <SettingsModal
        open={openModal}
        setOpen={setOpenModal}
        companySettings={companySettingsSelected}
        refreshData={companySettings.mutate}
      />
      <Box>
        { companySettings?.data.exchangeConfigs.map(
          (settings: CompanySettingsFromApi) => (
            <Box key={settings.companyId}>
              <Typography>{ settings.companyName } | { settings.sellAveragePrice }</Typography>
              <Button onClick={() => handleSelectedSetting({
                setOpenModal,
                setCompanySettingsSelected },
                {
                  value: settings.sellAveragePrice,
                  companyId: settings.companyId,
                  settingsId: settings.id,
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
