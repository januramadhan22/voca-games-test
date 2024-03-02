import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

type PropsType = {
  children: React.ReactNode;
};

const Providers = (props: PropsType) => {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
