import React, { type ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex flex-col items-center justify-between p-24 w-full"}>
      {children}
    </div>
  );
};

export default AuthLayout;
