"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@/lib/services/auth.service";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { ProfileButton } from "@/components/ProfileButton";
import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LastListens } from "./LastListens";
import { CurrentPlaylist } from "./CurrentPlaylist";
import { ListMusic, Menu, Music, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IUser } from "@/lib/types/IUser";

interface Props {
  user: IUser | null;
  collapse?: boolean;
}

export const Navbar: FC<Props> = ({ user, collapse }) => {
  const [burger, setBurger] = useState(false);

  const toggle = () => {
    setBurger((prev) => !prev);
  };

  return (
    <header className=" flex flex-col items-center lg:justify-between justify-end p-2 pt-10 sm:px-5 gap-[10px] lg:gap-10">
      <div
        className={cn(
          "flex flex-col items-start gap-12 w-full",
          collapse && "items-center",
        )}
      >
        <Link href={"/"} className="hidden lg:flex items-center gap-3">
          <Image
            src={"/sidebar-logo.png"}
            alt={"logo"}
            width={500}
            height={500}
            className={cn(
              "w-[30px] h-[30px] object-cover object-center transition-all",
              collapse && "w-[40px] h-[40px]",
            )}
          />
          <h1
            className={cn(
              "text-2xl font-bold hidden lg:block",
              collapse && "!hidden",
            )}
          >
            {" "}
            Musichub
          </h1>
        </Link>
        <nav
          className={cn(
            "fixed top-0 -left-full transition-all ease-out duration-1000 bg-accent w-full h-full flex-col justify-center lg:static  lg:justify-start lg:bg-transparent flex items-start gap-10 text-base text-primary font-semibold",
            burger && "left-0",
            collapse && "items-center",
          )}
        >
          <SearchInput className={"sm:hidden h-auto"} />
          <Link
            href={"/songs/1"}
            className={cn(
              "hover:text-destructive transition-all flex items-center gap-2",
              collapse && "gap-0",
            )}
            onClick={() => setBurger(false)}
          >
            <Music />
            <span className={cn(collapse && "hidden")}>Audio</span>
          </Link>
          <Link
            href={"/users/1"}
            className={cn(
              "hover:text-destructive transition-all flex items-center gap-2",
              collapse && "gap-0",
            )}
            onClick={() => setBurger(false)}
          >
            <Users />
            <span className={cn(collapse && "hidden")}>Community</span>
          </Link>
          <Link
            href={"/playlists/1"}
            className={cn(
              "hover:text-destructive transition-all flex items-center gap-2",
              collapse && "gap-0",
            )}
            onClick={() => setBurger(false)}
          >
            <ListMusic />
            <span className={cn(collapse && "hidden")}>Playlists</span>
          </Link>
        </nav>
      </div>
      <div className={"w-full flex flex-col items-center justify-between z-10"}>
        <div className={"flex flex-col items-center gap-[10px]"}>
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
        <div
          className={cn(
            "w-full flex flex-col lg:flex-row items-center gap-[10px] lg:gap-[20px] justify-between",
            collapse && "!flex-col",
          )}
        >
          <ThemeToggle collapse={!user} />
          {user && (
            <>
              <CurrentPlaylist />
              <LastListens songs={user.lasts.map((last) => last.song)} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
