import { Modal, Box, Typography, TextField, Autocomplete, Select, MenuItem, Button } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCompanies } from "hooks/companies-hooks";
import { Controller, useForm } from "react-hook-form";

type TransactionsModalTypes = {
  open: boolean;
}

type TransactionsFormTypes = {
  averagePrice: number;
  company: string;
  date: Date | null;
  totalMiles: number,
  totalMoney: number,
  type: string,
}

const onSubmit = (formData: TransactionsFormTypes): void => {
  console.log(formData);
};

function TransactionsModal({ open }: TransactionsModalTypes) {
  const companies = useCompanies();
  const { control, getValues, setValue, handleSubmit, watch } = useForm<TransactionsFormTypes>({
    defaultValues: {
      averagePrice: 0,
      company: '',
      date: new Date(),
      totalMiles: 0,
      totalMoney: 0,
      type: '',
    },
  });

  const date = watch('date');

  return (
    <Modal
      open={open}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box borderRadius={8} display='flex' alignItems='center' flexDirection='column' sx={{ backgroundColor: 'white', height: '70vh', width: '70vw' }}>
        <Typography textAlign='center' variant='h4'>Criação de Transação</Typography>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography display='block' width='10%'>Companhia: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Autocomplete
              options={companies.data?.companies || []}
              getOptionLabel={(option) => option.name}
              onChange={(_event, newValue) => setValue('company', newValue?.name || '')}
              renderInput={(params) => <TextField {...params} placeholder='Digite a companhia' fullWidth />}
            />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography>Milhas/Pontos: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Controller
              name='totalMiles'
              control={control}
              render={({ field }) => (
                <TextField {...field} placeholder='Digite quantidade de milhas/pontos' type='number' fullWidth />
              )}
            />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography>Tipo de Operação: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                >
                  <MenuItem value='+'>Entrada</MenuItem>
                  <MenuItem value='-'>Saída</MenuItem>
                </Select>
              )}
            />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography>Total: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Controller
              name='totalMoney'
              control={control}
              render={({ field }) => (
                <TextField {...field} placeholder='Digite total em R$' type='number' fullWidth />
              )}
            />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography>Dia da Transação: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DesktopDatePicker 
                inputFormat='dd/MM/yyyy'
                value={date || null}
                onChange={(newValue) => setValue('date', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Button type='submit' onClick={handleSubmit(onSubmit)}>Criar</Button>
      </Box>
    </Modal>
  );
}

export default TransactionsModal;
