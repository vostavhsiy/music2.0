"use client";

import React, { FC, useTransition } from "react";
import { IUser } from "@/lib/types/IUser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { follow, unfollow } from "@/lib/services/users.service";
import Link from "next/link";

interface Props {
  user: IUser;
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
    <div className={"flex flex-col gap-3 items-center p-4 rounded-[10px] "}>
      <Image
        src={user.image || ""}
        alt={"image"}
        width={500}
        height={600}
        className="w-[100px] h-[100px] object-cover object-center rounded-[10px]"
      />
      <div className="flex flex-col items-center gap-2 w-full">
        <Link
          href={`/profile/${user.id}`}
          className="text-center hover:underline transition-all w-full"
        >
          {user.login}
        </Link>
        {isAuth && isAuth !== user.id && (
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
        {isAuth && isAuth === user.id && (
          <Button className="w-1/2" variant="secondary" size="sm">
            It's you
          </Button>
        )}
      </div>
    </div>
  );
};
