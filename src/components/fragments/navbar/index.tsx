import { Switch, alpha, styled } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import React, { useState } from "react";

const CustomSwitch = styled(Switch)(({ theme, checked }) => ({
  "& .MuiSwitch-thumb": {
    backgroundColor: !checked ? blue[600] : orange[600],
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: !checked ? blue[600] : orange[600],
    "&:hover": {
      backgroundColor: alpha(
        !checked ? blue[600] : orange[600],
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: !checked ? blue[600] : orange[600],
  },
  "& .MuiSwitch-track": {
    backgroundColor: !checked ? blue[600] : orange[600],
  },
}));

type PropsType = {
  fixed?: boolean;
};

const Navbar = (props: PropsType) => {
  const { fixed } = props;

  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <nav
      className={`${
        fixed ? "sticky  top-0" : "relative"
      } z-[100] w-full px-[14px] py-[10px] flex justify-center md:justify-end items-center gap-2 text-[18px] font-bold bg-white`}
    >
      <p className={!checked ? "text-primary-blue" : "text-primary-black"}>
        Blue
      </p>
      <div
        className={`w-[40px] h-[40px] flex justify-center items-center border rounded-full ${
          checked ? "border-primary-orange" : "border-primary-blue"
        }`}
      >
        <CustomSwitch
          size="small"
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <p className={checked ? "text-primary-orange" : "text-primary-black"}>
        Orange
      </p>
    </nav>
  );
};

export default Navbar;
