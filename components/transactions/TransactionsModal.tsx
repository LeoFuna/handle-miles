/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, Box, Typography, TextField, Autocomplete, Select, MenuItem, Button, InputAdornment } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCompanies } from "hooks/companies-hooks";
import { useCreateTransaction } from "hooks/transactions-hooks";
import { Controller, useForm } from "react-hook-form";

type TransactionsModalTypes = {
  open: boolean;
  userId?: string
}

type TransactionsFormTypes = {
  companyId: string;
  date: Date | null;
  totalMiles: string,
  totalMoney: string,
  type: string,
  note: string,
}

const calcAveragePrice = (miles: number, total: number): number => {
  return (total / (miles / 1000));
};

const onSubmit = async (formData: TransactionsFormTypes, userId?: string): Promise<void> => {
  const averagePrice = calcAveragePrice(parseInt(formData.totalMiles), parseFloat(formData.totalMoney));
  const { totalMoney, totalMiles, ...rest } = formData;
  await useCreateTransaction({ ...rest, averagePrice, totalMiles: parseInt(totalMiles), userId });
};

function TransactionsModal({ open, userId }: TransactionsModalTypes) {
  const companies = useCompanies();
  const { control, setValue, handleSubmit, watch } = useForm<TransactionsFormTypes>({
    defaultValues: {
      companyId: '',
      date: new Date(),
      totalMiles: '',
      totalMoney: '',
      type: '',
      note: '',
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
            <Typography textAlign='center'>Companhia: </Typography>
          </Box>
          <Box width='75%' m={1}>
            <Autocomplete
              options={companies.data?.companies || []}
              getOptionLabel={(option) => option.name}
              onChange={(_event, newValue) => setValue('companyId', newValue?.id || '')}
              renderInput={(params) => <TextField {...params} placeholder='Digite a companhia' fullWidth />}
            />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography textAlign='center'>Milhas/Pontos: </Typography>
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
            <Typography textAlign='center'>Tipo de Operação: </Typography>
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
            <Typography textAlign='center'>Total: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Controller
              name='totalMoney'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                />
              )}
            />
          </Box>
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography textAlign='center'>Dia da Transação: </Typography>
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
        <Box display='flex' alignItems='center' width='90%'>
          <Box width='25%'>
            <Typography textAlign='center'>Descrição: </Typography>
          </Box>
          <Box width='75%' m={1} >
            <Controller
              name='note'
              control={control}
              render={({ field }) => (
                <TextField {...field} placeholder='Motivo da transação' fullWidth />
              )}
            />
          </Box>
        </Box>
        <Button type='submit' onClick={handleSubmit((form: TransactionsFormTypes) => onSubmit(form, userId))}>Criar</Button>
      </Box>
    </Modal>
  );
}

export default TransactionsModal;
