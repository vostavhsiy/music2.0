import React, { ReactNode, useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { Player } from "@/components/Player/Player";
import { IUser } from "@/lib/types/IUser";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Footer } from "./Footer";

interface Props {
  children: ReactNode;
  profile: IUser | null;
}

export function Main({ children, profile }: Props) {
  return (
    <>
      <main
        className={
          "max-w-[2560px] grid grid-rows-[auto_1fr_auto] w-full mx-auto relative bg-background h-full pt-3 overflow-auto"
        }
      >
        <Navbar profile={profile} />
        <div className={"w-full h-full min-w-0"}>{children}</div>
        <Footer />
      </main>
    </>
  );
}
