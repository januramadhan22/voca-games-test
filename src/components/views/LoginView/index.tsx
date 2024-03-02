import FilledButton from "@/components/fragments/button/FilledButton";
import TextButton from "@/components/fragments/button/TextButton";
import PasswordInput from "@/components/fragments/form/PasswordInput";
import TextInput from "@/components/fragments/form/TextInput";
import Navbar from "@/components/fragments/navbar";
import BackgroundLayout from "@/components/layouts/backgroundLayout";
import {
  setAuthorized,
  setUserData,
} from "@/lib/redux/reducers/user/userSlice";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import withAuth from "@/middlewares/withAuth";

const LoginView = () => {
  const session = useSession();
  const { push, query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const method = useForm();
  const { errors } = method.formState;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callbackUrl: any = query.callbackUrl || "/";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        name: data.username,
        password: data.password,
        callbackUrl,
      });

      setIsLoading(false);
      if (!response?.error) {
        alert("Login successfully");
        if (session) {
          dispatch(setUserData(session?.data?.user));
          dispatch(setAuthorized(true));
          Cookies.set("user", JSON.stringify(session?.data?.user), {
            expires: 1 / 24,
            path: "/",
            sameSite: "strict",
          });
        }
      } else {
        alert("Username or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Username or password is incorrect");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row relative">
      <BackgroundLayout>
        <div className="w-full px-10 flex flex-col items-center gap-20">
          <div className="w-[60%] text-center text-secondary-grey">
            <h1 className="text-[48px] font-bold">Title</h1>
            <p>
              {
                "'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, vitae praesentium? Beatae ea praesentium fuga quis nemo quibusdam quia quaerat?'"
              }
            </p>
          </div>
        </div>
      </BackgroundLayout>
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

          <FormProvider {...method}>
            {/* Form Element */}
            <div className="max-w-lg w-full flex flex-col gap-5  text-secondary-grey">
              <TextInput
                variant="dark"
                label="Username"
                name="username"
                placeholder="Username anda.."
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Min have 3 characters",
                  },
                }}
              />
              <PasswordInput
                variant="dark"
                label="Password"
                name="password"
                placeholder="Password anda.."
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Min have 4 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Max have 12 characters",
                  },
                }}
              />
            </div>
          </FormProvider>

          {/* Action Element */}
          <form
            onSubmit={method.handleSubmit(handleSignIn)}
            className="max-w-lg w-full flex flex-col items-center gap-10"
          >
            <FilledButton
              disabled={
                Object.keys(errors).length > 0 ||
                method.watch("username", "") === "" ||
                method.watch("password", "") === ""
              }
              label={isLoading ? "Loading..." : "Masuk Sekarang"}
              variant="primary"
              size="medium"
            />
            <span className="text-lg font-bold text-primary-grey flex flex-col md:flex-row gap-1">
              Belum punya akun?{" "}
              <TextButton
                variant="primary"
                label="Daftar Sekarang"
                size="medium"
                onSubmit={() => push("/auth/register")}
              />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LoginView);
