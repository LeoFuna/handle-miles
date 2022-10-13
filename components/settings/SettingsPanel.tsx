import { Box, Button, Typography } from "@mui/material";
import { CompanySettingsFromApi, useCompanySettingsByFamily } from "hooks/settings-hooks";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getSerializedValuesFromSession } from "../../utils/session-utils";
import SettingsModal from "./SettingsModal";
import { Edit } from "@mui/icons-material";

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

function SettingsPanel({ familyId }: { familyId: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [companySettingsSelected, setCompanySettingsSelected] = useState<CompanySettings>({
    value: 0, companyId: '', settingsId: '',
  });
  const companySettings = useCompanySettingsByFamily({ familyId });
  if (!companySettings?.data) return (<Box>Carregando...</Box>);
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
            <Box display='flex' alignItems='center' key={settings.companyId}>
              <Typography>{ settings.companyName } | Milheiro: R$ { settings.sellAveragePrice }</Typography>
              <Button onClick={() => handleSelectedSetting({
                setOpenModal,
                setCompanySettingsSelected },
                {
                  value: settings.sellAveragePrice,
                  companyId: settings.companyId,
                  settingsId: settings.id,
                })}
              >
                <Edit />
              </Button>
            </Box>
        )) 
        }
      </Box>
    </>
  );
}

export default SettingsPanel;
