import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./RegisterForm";
import Head from "next/head";

const Register = () => {
  return (
    <>
      <Head>
        <title>Register - RecomendTube</title>
        <meta
          name="description"
          content="Create an account on RecomendTube and start creating playlist and share"
        />
      </Head>
      <RegisterForm />
    </>
  );
};

export default Register;
