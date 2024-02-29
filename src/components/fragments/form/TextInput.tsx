import React from "react";

type PropsType = {
  variant?: string;
  label: string;
  name: string;
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: PropsType) => {
  const { variant, label, name, placeholder, handleChange } = props;

  return (
    <form className={`w-full flex flex-col gap-3 text-lg bg-transparent`}>
      <label
        className={`font-bold capitalize ${
          variant === "light" ? "text-secondary-grey" : "text-primary-grey"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={`w-full max-h-[70px] px-8 py-5 rounded-full border bg-transparent focus:outline-none ${
          variant === "light"
            ? "text-secondary-grey border-secondary-grey"
            : "text-primary-black border-primary-grey"
        }`}
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};

export default TextInput;
