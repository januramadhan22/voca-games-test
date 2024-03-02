import RegisterView from "@/components/views/RegisterView";
import withAuth from "@/middlewares/withAuth";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <RegisterView />
    </>
  );
};

export default withAuth(RegisterPage);
