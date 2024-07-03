"use client";

import React, { FC, useTransition } from "react";
import { IUser } from "@/lib/types/IUser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { follow, unfollow } from "@/lib/services/users.service";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  user: IUser & { _count: { subscribers: number } };
  isAuth: string | undefined;
  isFollow: boolean;
  currentPage: number;
}

export const UserCard: FC<Props> = ({
  user,
  isAuth,
  isFollow,
  currentPage,
}) => {
  const [isPending, startTransition] = useTransition();

  const clickHandler = async () => {
    if (isAuth) {
      if (isFollow) {
        startTransition(() => {
          unfollow(user.id);
        });
        // await unfollow(user.id);
      } else {
        startTransition(() => {
          follow(user.id);
        });
        //await follow(user.id);
      }
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[2fr_repeat(4,1fr)]",
        !isAuth && "grid-cols-[2fr_repeat(3,1fr)]",
      )}
    >
      <div className={"flex gap-6 items-center p-4 rounded-[10px] "}>
        <div className="w-[80px] aspect-square rounded-lg p-[2px] bg-gradient-to-r from-amber-500 to-pink-500">
          <Image
            src={user.image || "/user.webp"}
            alt={"image"}
            width={500}
            height={600}
            className="w-full h-full bg-secondary object-cover object-center rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link
            href={`/profile/${user.id}`}
            className="hover:underline transition-all w-full text-lg"
          >
            {user.login}
          </Link>
        </div>
      </div>
      <div className={"flex items-center text-lg"}>
        {user._count.subscribers} subs
      </div>
      <div className={"flex items-center text-lg"}>
        {user.songs.length} songs
      </div>
      <div className={"flex items-center text-lg"}>
        {user.playlists.length} playlists
      </div>
      {isAuth && (
        <div className={"flex items-center"}>
          {isAuth !== user.id && (
            <Button
              variant="secondary"
              className="w-1/2"
              size="sm"
              disabled={isPending}
              onClick={clickHandler}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </Button>
          )}
          {isAuth === user.id && (
            <Button className="w-1/2" variant="secondary" size="sm">
              It's you
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
