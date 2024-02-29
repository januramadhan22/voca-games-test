import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

type PropsType = {
  variant?: string;
  label: string;
  name: string;
  placeholder?: string;
  showPassword?: boolean;
  handleShowPassword?: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = (props: PropsType) => {
  const {
    variant,
    label,
    name,
    placeholder,
    showPassword,
    handleShowPassword,
    handleChange,
  } = props;

  return (
    <form className="w-full flex flex-col gap-3 text-lg bg-transparent">
      <label
        className={`font-bold capitalize ${
          variant === "light" ? "text-secondary-grey" : "text-primary-grey"
        }`}
      >
        {label}
      </label>
      <div
        className={`w-full max-h-[70px] flex items-center px-8 py-5 rounded-full border ${
          variant === "light" ? "border-secondary-grey" : "border-primary-grey"
        }`}
      >
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full bg-transparent focus:outline-none  ${
            variant === "light" ? "text-secondary-grey" : "text-primary-black"
          }`}
          onChange={(e) => handleChange(e)}
        />
        <span
          title={showPassword ? "hide password" : "show password"}
          className={`h-11 flex justify-center items-center rounded-full bg-opacity-50 cursor-pointer hover:brightness-110 ${
            variant === "light"
              ? "bg-white text-white w-[80px] px-6"
              : "bg-transparent text-primary-blue w-auto"
          }`}
          onClick={handleShowPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>
    </form>
  );
};

export default PasswordInput;
