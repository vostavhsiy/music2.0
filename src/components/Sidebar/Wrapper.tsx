"use client";

import { UserCard } from "./UserCard";
import { Navbar } from "../Navbar";
import { IUser } from "@/lib/types/IUser";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
interface Props {
  recommendedUsers: IUser[] | null;
  subscribes: IUser[] | null;
  profile: IUser | null;
}

export function Wrapper({ recommendedUsers, subscribes, profile }: Props) {
  const [collapse, setCollapse] = useState(false);

  const currentSong = useAppSelector((state) => state.audio.currentSong);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 h-full border-r-[1px] border-b-border w-[250px] transition-all",
        collapse && "w-[100px]",
      )}
    >
      <Button
        onClick={() => setCollapse((prev) => !prev)}
        size={"icon"}
        variant={"ghost"}
        className={cn(
          "absolute right-3 bottom-3",
          collapse && "right-1/2 translate-x-1/2",
          currentSong && !collapse && "right-auto left-3",
        )}
      >
        {collapse ? <ChevronsRight /> : <ChevronsLeft />}
      </Button>
      <Navbar user={profile} collapse={collapse} />
      {(!profile || (profile && !collapse)) && (
        <div className="flex flex-col items-center gap-2 transition-all">
          {!!recommendedUsers?.length && (
            <div className="flex flex-col gap-4 w-full p-4 pt-0 pb-0 mb-0">
              <h2
                className={cn(
                  "hidden lg:block text-sm text-zinc-400 font-semibold",
                  collapse && "text-center",
                )}
              >
                {collapse ? "Recs" : "Recommended"}
              </h2>
              <h2 className="lg:hidden text-sm text-zinc-400 font-semibold">
                Recs
              </h2>
              <div className="flex flex-col gap-[15px] w-full animate-in">
                {recommendedUsers.map((user) => {
                  return (
                    <UserCard key={user.id} user={user} collapse={collapse} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
