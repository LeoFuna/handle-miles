/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useUpdateCompanySettings } from "hooks/settings-hooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm, UseFormReset } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CompanySettings } from "./SettingsPanel";

const onSubmit = (
  form: { field: number },
  setOpen: Dispatch<SetStateAction<boolean>>,
  reset:  UseFormReset<{ field: number }>,
  refreshData: KeyedMutator<any>,
  companySettings: CompanySettings
  ) => {
  const { settingsId } = companySettings;
  useUpdateCompanySettings({ sellAveragePrice: form.field, settingsId });
  reset({});
  refreshData();
  setOpen(false);
};

function SettingsModal({ open, setOpen, companySettings, refreshData }: any) {
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      field: companySettings.value,
    },
  });
  useEffect(() => {
    setValue('field', companySettings.value);
  }, [companySettings]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box borderRadius={8} display='flex' alignItems='center' flexDirection='column' sx={{ backgroundColor: 'white', height: '30vh', width: '30vw' }}>
        <Typography textAlign='center' marginTop={2} variant='h4'>Alterar Campo</Typography>
        <Box display='flex' flexDirection='column' alignItems='center' marginTop={2} width='90%'>
          <Box width='75%'>
            <Typography textAlign='center'>Preço de Venda: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Controller
              name='field'
              control={control}
              defaultValue={companySettings.value}
              render={({ field }) => (
                <TextField {...field} type='number' fullWidth />
              )}
            />
          </Box>
        </Box>
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: '18px' }}
          size='large'
          onClick={handleSubmit((form) => onSubmit(form, setOpen, reset, refreshData, companySettings))}
        >
          Alterar
        </Button>
      </Box>
    </Modal>
  );
}

export default SettingsModal;
