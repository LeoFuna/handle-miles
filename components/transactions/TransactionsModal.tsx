import { Modal, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type TransactionsModalTypes = {
  open: boolean;
}

type TransactionsFormTypes = {
  averagePrice: number;
  company: string;
  date: string;
  totalMiles: number,
  type: string,
}

function TransactionsModal({ open }: TransactionsModalTypes) {
  const { control, getValues, setValue, handleSubmit } = useForm<TransactionsFormTypes>({
    defaultValues: {
      averagePrice: 0,
      company: '',
      date: '',
      totalMiles: 0,
      type: '',
    },
  });
  return(
    <Modal
      open={open}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box borderRadius={8} display='flex' alignItems='center' flexDirection='column' sx={{ backgroundColor: 'white', height: '70vh', width: '70vw' }}>
        <Typography textAlign='center' variant='h4'>Criação de Transação</Typography>
        <Box display='flex' alignItems='center' width='90%'>
          <Typography>Companhia: </Typography>
          <Controller
            name='company'
            control={control}
            render={({ field }) => (
              <TextField {...field} placeholder='Digite a companhia' fullWidth />
            )}
          />
        </Box>
        <Box display='flex' alignItems='center' width='90%'>
          <Typography>Total de Milhas/Pontos: </Typography>
          <Controller
            name='totalMiles'
            control={control}
            render={({ field }) => (
              <TextField {...field} placeholder='Digite quantidade de milhas/pontos' type='number' fullWidth />
            )}
          />
        </Box>
      </Box>
    </Modal>
  );
}

export default TransactionsModal;
