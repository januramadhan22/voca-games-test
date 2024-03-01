import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type PropsType = {
  variant?: string;
  label: string;
  name: string;
  placeholder?: string;
  rules?: Record<string, any>;
};

const TextInput = (props: PropsType) => {
  const { variant, label, name, placeholder, rules } = props;
  const { control } = useFormContext();

  return (
    <form className={`w-full flex flex-col gap-3 text-lg bg-transparent`}>
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
            <input
              {...field}
              type="text"
              placeholder={placeholder}
              className={`w-full max-h-[70px] px-8 py-5 rounded-full border bg-transparent focus:outline-none ${
                variant === "light"
                  ? "text-secondary-grey border-secondary-grey"
                  : "text-primary-black border-primary-grey"
              }`}
            />
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
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default TextInput;
