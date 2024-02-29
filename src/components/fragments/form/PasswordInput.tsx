import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

type PropsType = {
  label: string;
  name: string;
  placeholder: string;
  showPassword: boolean;
  handleShowPassword: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = (props: PropsType) => {
  const {
    label,
    name,
    placeholder,
    showPassword,
    handleShowPassword,
    handleChange,
  } = props;

  return (
    <form className="w-full flex flex-col gap-3 text-lg text-secondary-grey bg-transparent">
      <label className="font-bold capitalize">{label}</label>
      <div className="w-full max-h-[70px] flex items-center px-8 py-5 rounded-full border focus:border-blue-400">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full bg-transparent focus:outline-none"
          onChange={(e) => handleChange(e)}
        />
        <span
          title={showPassword ? "hide password" : "show password"}
          className="w-[80px] h-11 px-6 flex justify-center items-center rounded-full bg-soft-blue bg-opacity-50 cursor-pointer hover:brightness-110"
          onClick={handleShowPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>
    </form>
  );
};

export default PasswordInput;
