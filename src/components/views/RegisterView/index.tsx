import React, { useState } from "react";
import Navbar from "@/components/fragments/navbar";
import BackgroundLayout from "@/components/layouts/backgroundLayout";
import TextInput from "@/components/fragments/form/TextInput";
import PasswordInput from "@/components/fragments/form/PasswordInput";
import FilledButton from "@/components/fragments/button/FilledButton";
import TextButton from "@/components/fragments/button/TextButton";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

type FormDataTypes = {
  name: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
};

const RegisterView = () => {
  const { push } = useRouter();
  const method = useForm();
  const { errors } = method.formState;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<any>({
    password: false,
    confirmPassword: false,
  });

  const handleShowPassword = (type: string, value: boolean) => {
    setShowPassword({ ...showPassword, [type]: value });
  };

  const handleSignUp = async (data: any) => {
    const form = {
      name: data.name,
      phonenumber: data.phonenumber,
      password: data.password,
    };

    setIsLoading(true);
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setIsLoading(false);

    if (response.status === 200) {
      alert("Register has been success");
      push("/auth/login");
    } else {
      alert("Name already registered");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Navbar fixed />
      <BackgroundLayout fullHeight={true}>
        <header className="max-w-lg w-full px-10 flex flex-col gap-5  text-secondary-grey">
          <h1 className="text-[64px] font-extrabold">Daftarkan Akun</h1>
          <p className="text-lg">
            Daftar akun anda dengan mengisi form dibawah
          </p>
        </header>

        <FormProvider {...method}>
          {/* Form Element */}
          <div className="max-w-lg w-full px-10 flex flex-col gap-5  text-secondary-grey">
            <TextInput
              variant="light"
              label="Nama Anda"
              name="name"
              placeholder="Ketik nama anda disini.."
              rules={{
                required: "Name cannot be empty",
                minLength: {
                  value: 3,
                  message: "Min have 3 characters",
                },
              }}
            />
            <TextInput
              variant="light"
              label="Nomor Handphone"
              name="phonenumber"
              placeholder="Nomor handphone anda"
              rules={{
                required: "Phonenumber cannot be empty",
                minLength: {
                  value: 6,
                  message: "Min have 6 characters",
                },
                maxLength: {
                  value: 13,
                  message: "Max have 13 characters",
                },
              }}
            />
            <PasswordInput
              variant="light"
              label="Password"
              name="password"
              placeholder="Masukkan password anda"
              showPassword={showPassword.password}
              handleShowPassword={() =>
                handleShowPassword("password", !showPassword.password)
              }
              rules={{
                required: "Password cannot be empty",
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
            <PasswordInput
              variant="light"
              label="Konfirmasi Password"
              name="confirmPassword"
              placeholder="Masukkan kembali password anda"
              showPassword={showPassword.confirmPassword}
              handleShowPassword={() =>
                handleShowPassword(
                  "confirmPassword",
                  !showPassword.confirmPassword
                )
              }
              rules={{
                required: "Confirm Password is required",
              }}
              password={method.watch("password", "")}
            />
          </div>

          {/* Action Element */}
          <form
            onSubmit={method.handleSubmit(handleSignUp)}
            className="max-w-lg w-full px-10 flex flex-col items-center gap-10"
          >
            <FilledButton
              disabled={
                Object.keys(errors).length > 0 ||
                method.watch("name", "") === "" ||
                method.watch("phonenumber", "") === "" ||
                method.watch("password", "") === "" ||
                method.watch("confirmPassword", "") === ""
              }
              label={isLoading ? "Loading..." : "Daftar Sekarang"}
              variant="primary"
              size="medium"
            />
            <span className="text-lg font-bold text-white flex gap-1">
              Sudah punya akun?{" "}
              <TextButton
                variant="light"
                label="Login Sekarang"
                size="medium"
                onSubmit={() => push("/auth/login")}
              />
            </span>
          </form>
        </FormProvider>
      </BackgroundLayout>
    </div>
  );
};

export default RegisterView;
