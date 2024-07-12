import React, { type ReactNode } from "react";
import { Main } from "@/app/(browse)/_components/Main";
import { Footer } from "@/app/(browse)/_components/Footer";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={
        "grid grid-rows-[1fr_auto] min-h-screen max-w-[1920px] mx-auto"
      }
    >
      <div className="w-full p-10 pb-0 flex items-center justify-center">
        {children}
      </div>
      <Footer auth />
    </main>
  );
};

export default AuthLayout;
