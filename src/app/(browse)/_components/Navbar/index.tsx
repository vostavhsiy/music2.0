"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@/lib/services/auth.service";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { ProfileButton } from "@/components/ProfileButton";
import { SearchInput } from "@/app/(browse)/_components/Navbar/SearchInput";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LastListens } from "@/app/(browse)/_components/Navbar/LastListens";
import { CurrentPlaylist } from "@/app/(browse)/_components/Navbar/CurrentPlaylist";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IUser } from "@/lib/types/IUser";

interface Props {
  user: IUser | null;
}

export const Navbar: FC<Props> = ({ user }) => {
  const [burger, setBurger] = useState(false);

  const toggle = () => {
    setBurger((prev) => !prev);
  };

  return (
    <header className=" flex items-center flex-row-reverse lg:flex-row lg:justify-between justify-end px-2 sm:px-5 border-b-2 border-b-border gap-[10px] lg:gap-0">
      <div className="flex items-center gap-20">
        <Link href={"/"} className="hidden lg:flex items-center gap-3">
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={500}
            height={500}
            className="w-[25px] h-[25px] object-cover object-center"
          />
          <h1 className="text-sm font-bold hidden lg:block"> Musichub</h1>
        </Link>
        <nav
          className={cn(
            "fixed top-0 -left-full transition-all ease-out duration-1000 bg-accent w-full h-full flex-col justify-center lg:static lg:flex-row lg:justify-start lg:bg-transparent flex items-center gap-10 text-base text-primary font-semibold",
            burger && "left-0",
          )}
        >
          <SearchInput className={"sm:hidden h-auto"} />
          <Link
            href={"/songs/1"}
            className="hover:text-destructive transition-all"
            onClick={() => setBurger(false)}
          >
            Audio
          </Link>
          <Link
            href={"/playlists/1"}
            className="hover:text-destructive transition-all"
            onClick={() => setBurger(false)}
          >
            Playlists
          </Link>
          <Link
            href={"/users/1"}
            className="hover:text-destructive transition-all"
            onClick={() => setBurger(false)}
          >
            Community
          </Link>
        </nav>
      </div>
      <SearchInput className={"hidden sm:block"} />
      <div
        className={"w-full lg:w-auto flex items-center justify-between z-10"}
      >
        <div className={"flex items-center gap-[10px]"}>
          <Link
            href={"/"}
            className="flex lg:hidden items-center gap-3"
            onClick={() => setBurger(false)}
          >
            <Image
              src={"/logo.png"}
              alt={"logo"}
              width={500}
              height={500}
              className="w-[35px] h-[35px] object-cover object-center"
            />
          </Link>
          <Button size={"icon"} className={"lg:hidden"} onClick={toggle}>
            {burger ? <X /> : <Menu />}
          </Button>
        </div>
        <div className={"flex items-center gap-[10px] lg:gap-[20px]"}>
          <ThemeToggle />
          {user ? (
            <>
              <CurrentPlaylist />
              <LastListens songs={user.lasts.map((last) => last.song)} />
              <div className="flex items-center gap-[8px] lg:gap-[15px] ">
                <LogoutButton inNavbar />
                <ProfileButton user={user} />
              </div>
            </>
          ) : (
            <Button asChild={true} variant={"secondary"}>
              <Link href={"/login"}>Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
