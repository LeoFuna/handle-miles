import { Container } from "@mui/material";
import SigninForm from "components/auth/SigninForm";
import Head from "next/head";

function Signin() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth='xs' sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
      }}>
        <SigninForm />
      </Container>
    </>
  );
}

export default Signin;
