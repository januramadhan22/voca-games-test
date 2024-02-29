import React from "react";

type PropsType = {
  label: string;
  variant: string;
  size?: string;
  icon?: boolean;
  onSubmit: () => void;
};

const TextButton = (props: PropsType) => {
  const { label, variant, size, icon, onSubmit } = props;

  return (
    <button
      className={`p-0 flex justify-center items-center gap-2 bg-transparent font-bold capitalize hover:underline ${
        variant === "primary"
          ? `text-primary-blue`
          : variant === "secondary"
          ? `text-primary-orange`
          : variant === "light" && `text-white`
      } ${size === "small" ? "text-xs" : "text-lg"}`}
      onClick={onSubmit}
    >
      {label}
    </button>
  );
};

export default TextButton;
