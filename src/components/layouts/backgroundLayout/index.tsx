"use-client";

import React from "react";

import CircleImage from "../../../assets/images/circle.svg";
import CubeImage from "../../../assets/images/cube.svg";
import Image from "next/image";

type PropsType = {
  children: React.ReactNode;
  fullHeight: boolean;
};

const BackgroundLayout = (props: PropsType) => {
  const { children, fullHeight } = props;

  return (
    <div
      className={`relative w-full min-h-screen py-[98px] bg-primary-blue overflow-x-clip`}
    >
      <Image
        src={CircleImage}
        alt="circle"
        className="absolute top-0 left-0 w-auto h-auto"
      />
      <Image
        src={CubeImage}
        alt="cube"
        className="absolute w-auto h-auto -right-[20%] bottom-[30px]"
      />
      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center gap-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;
