import React from "react";

type PropsType = {
  label: string;
  name: string;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: PropsType) => {
  const { label, name, placeholder, handleChange } = props;

  return (
    <form className="w-full flex flex-col gap-3 text-lg text-secondary-grey bg-transparent">
      <label className="font-bold capitalize">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-full max-h-[70px] px-8 py-5 rounded-full border bg-transparent focus:outline-none"
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};

export default TextInput;
