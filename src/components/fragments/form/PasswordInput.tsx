import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type PropsType = {
  variant?: string;
  label: string;
  name: string;
  placeholder?: string;
  showPassword?: boolean;
  rules?: Record<string, any>;
  password?: string;
  handleShowPassword?: () => void;
};

const PasswordInput = (props: PropsType) => {
  const {
    variant,
    label,
    name,
    placeholder,
    showPassword,
    rules,
    password,
    handleShowPassword,
  } = props;
  const { control } = useFormContext();

  return (
    <form className="w-full flex flex-col gap-3 text-lg bg-transparent">
      <label
        className={`font-bold capitalize ${
          variant === "light" ? "text-secondary-grey" : "text-primary-grey"
        }`}
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <div
              className={`w-full max-h-[70px] flex items-center px-8 py-5 rounded-full border ${
                variant === "light"
                  ? "border-secondary-grey"
                  : "border-primary-grey"
              }`}
            >
              <input
                {...field}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={`w-full bg-transparent focus:outline-none  ${
                  variant === "light"
                    ? "text-secondary-grey"
                    : "text-primary-black"
                }`}
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
            <div className="flex gap-1">
              {rules?.required && field.value === "" && (
                <span className="text-sm text-red-600 italic">
                  {rules.required}
                </span>
              )}
              {rules?.minLength &&
                field.value !== "" &&
                field?.value?.length < rules?.minLength?.value && (
                  <span className="text-sm text-red-600 italic">
                    {rules.minLength.message}
                  </span>
                )}
              {rules?.maxLength &&
                field.value !== "" &&
                field?.value?.length > rules?.maxLength?.value && (
                  <span className="text-sm text-red-600 italic">
                    {rules.maxLength.message}
                  </span>
                )}
              {name === "confirmPassword" &&
                field.value !== "" &&
                password &&
                field.value !== password && (
                  <span className="text-sm text-red-600 italic">
                    Passwords not match
                  </span>
                )}
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default PasswordInput;
