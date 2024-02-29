import React, { FormEvent, useState } from "react";
import Navbar from "@/components/fragments/navbar";
import BackgroundLayout from "@/components/layouts/backgroundLayout";
import TextInput from "@/components/fragments/form/TextInput";
import PasswordInput from "@/components/fragments/form/PasswordInput";
import FilledButton from "@/components/fragments/button/FilledButton";
import TextButton from "@/components/fragments/button/TextButton";
import { useRouter } from "next/router";

type FormDataTypes = {
  name: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
};

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState<any>({
    password: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = (type: string, value: boolean) => {
    setShowPassword({ ...showPassword, [type]: value });
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignUp = async () => {
    const form = {
      name: formData.name,
      phonenumber: formData.phonenumber,
      password: formData.password,
    };

    if (formData.password !== formData.confirmPassword) {
      alert("Password not match");
    } else {
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
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Navbar fixed />
      <BackgroundLayout fullHeight={true}>
        <header className="max-w-lg w-full flex flex-col gap-5  text-secondary-grey">
          <h1 className="text-[64px] font-extrabold">Daftarkan Akun</h1>
          <p className="text-lg">
            Daftar akun anda dengan mengisi form dibawah
          </p>
        </header>

        {/* Form Element */}
        <div className="max-w-lg w-full flex flex-col gap-5  text-secondary-grey">
          <TextInput
            variant="light"
            label="Nama Anda"
            name="name"
            placeholder="Ketik nama anda disini.."
            handleChange={handleChangeInput}
          />
          <TextInput
            variant="light"
            label="Nomor Handphone"
            name="phonenumber"
            placeholder="Nomor handphone anda"
            handleChange={handleChangeInput}
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
            handleChange={handleChangeInput}
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
            handleChange={handleChangeInput}
          />
        </div>

        {/* Action Element */}
        <div className="max-w-lg w-full flex flex-col items-center gap-10">
          <FilledButton
            label={isLoading ? "Loading..." : "Daftar Sekarang"}
            variant="primary"
            size="medium"
            onSubmit={handleSignUp}
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
        </div>
      </BackgroundLayout>
    </div>
  );
};

export default RegisterView;
