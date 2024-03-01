import { disableNetwork } from "firebase/firestore";
import React from "react";

type PropsType = {
  label: string;
  variant: string;
  size?: string;
  icon?: boolean;
  disabled?: boolean;
  onSubmit?: () => void;
};

const FilledButton = (props: PropsType) => {
  const { label, variant, size, icon, disabled, onSubmit } = props;

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full px-8 py-5 rounded-full flex justify-center items-center gap-2 font-bold capitalize hover:brightness-95 ${
        disabled && "cursor-not-allowed"
      } ${
        variant === "primary"
          ? `bg-soft-blue text-primary-blue`
          : variant === "secondary"
          ? `bg-soft-orange text-primary-orange`
          : variant === "light" && `bg-soft-blue text-black`
      } ${size === "small" ? "text-xs" : "text-lg"}`}
      onClick={onSubmit}
    >
      {label}
    </button>
  );
};

export default FilledButton;
