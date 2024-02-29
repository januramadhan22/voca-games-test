import FilledButton from "@/components/fragments/button/FilledButton";
import TextButton from "@/components/fragments/button/TextButton";
import PasswordInput from "@/components/fragments/form/PasswordInput";
import TextInput from "@/components/fragments/form/TextInput";
import Navbar from "@/components/fragments/navbar";
import BackgroundLayout from "@/components/layouts/backgroundLayout";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginView = () => {
  const { push, query } = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const callbackUrl: any = query.callbackUrl || "/";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        name: formData.username,
        password: formData.password,
        callbackUrl,
      });
      console.log(response);

      setIsLoading(false);
      // if (!response?.error) {
      //   alert("Login successfully");
      // } else {
      //   alert("Username or password is incorrect");
      // }
    } catch (error) {
      setIsLoading(false);
      alert("Username or password is incorrect");
    }
  };

  return (
    <div className="w-full min-h-screen flex relative">
      <BackgroundLayout>asdad</BackgroundLayout>
      <div className="w-full h-full flex flex-col items-center">
        <Navbar fixed />
        <div className="max-w-[80%] h-full py-10 flex flex-col justify-center items-center gap-10">
          <header className="max-w-lg w-full flex flex-col items-start gap-5 text-left">
            <h1 className="text-[64px] font-extrabold tracking-tighter text-primary-blue">
              Silahkan Login
            </h1>
            <p className="text-lg text-primary-grey">
              Masukkan Username dan password anda untuk masuk
            </p>
          </header>

          {/* Form Element */}
          <div className="max-w-lg w-full flex flex-col gap-5  text-secondary-grey">
            <TextInput
              variant="dark"
              label="Username"
              name="username"
              placeholder="Username anda.."
              handleChange={handleChangeInput}
            />
            <PasswordInput
              variant="dark"
              label="Password"
              name="password"
              placeholder="Password anda.."
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
              handleChange={handleChangeInput}
            />
          </div>

          {/* Action Element */}
          <div className="max-w-lg w-full flex flex-col items-center gap-10">
            <FilledButton
              label={isLoading ? "Loading..." : "Masuk Sekarang"}
              variant="primary"
              size="medium"
              onSubmit={handleSignIn}
            />
            <span className="text-lg font-bold text-primary-grey flex gap-1">
              Belum punya akun?{" "}
              <TextButton
                variant="primary"
                label="Daftar Sekarang"
                size="medium"
                onSubmit={() => push("/auth/register")}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
