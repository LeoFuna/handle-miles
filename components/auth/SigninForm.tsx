import { Box, Button, InputLabel, TextField } from "@mui/material";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

type SigninFormValues = {
  email: string,
  password: string,
}

function SigninForm() {
  const { control, handleSubmit } = useForm<SigninFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SigninFormValues) => {
    console.log(data);
  };

  return (
    <Box width='100%'>
      <Box textAlign='center' mb='24px'>
        <Image alt='airplane logo' src='/airplane-logo.png' width='250' height='250' style={{borderRadius: '10%'}} />
      </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={2} mt={2} display='flex' alignItems='center'>
        <Box mr={1} width='80px'>
          <InputLabel>Email</InputLabel>
        </Box>
        <Controller 
          name='email'
          control={control}
          render={({field}) => (
            <TextField  {...field} type='email' fullWidth variant='standard' />
          )}
        />
      </Box>
      <Box mb={2} display='flex' alignItems='center'>
        <Box mr={1} width='80px'>
          <InputLabel>Senha</InputLabel>
        </Box>
        <Controller 
          name='password'
          control={control}
          render={({field}) => (
            <TextField {...field} fullWidth type='password' variant='standard' />
          )}
        />
      </Box>
      <Box textAlign='right'>
        <Button type='submit'>
          Entrar
        </Button>
      </Box>
    </form>
  </Box>
  );
};

export default SigninForm;
