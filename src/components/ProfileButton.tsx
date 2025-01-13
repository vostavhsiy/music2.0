import React, { FC } from "react";
import { IUser } from "@/lib/types/IUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const ProfileButton: FC<{ user: IUser }> = ({ user }) => {
  return (
    <Link
      href={`/dashboard`}
      className={
        "rounded-full p-[2px] bg-gradient-to-r from-teal-400 to-yellow-200"
      }
    >
      <Avatar className={"bg-background"}>
        <AvatarImage className='object-cover' src={user.image || "/user.webp"} />
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
    </Link>
  );
};
