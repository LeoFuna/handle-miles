import { useRouter } from "next/router";
import { useEffect } from "react";

function Signout() {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/signin');
  }, []);

  return (
    <h1>Redirecionando...</h1>
  );
};

export default Signout;
