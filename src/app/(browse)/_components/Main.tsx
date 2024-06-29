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
    <main className={"relative bg-background h-full pt-3 overflow-auto"}>
      <Navbar profile={profile} />
      {children}
      <Footer />
      <Player />
    </main>
  );
}
