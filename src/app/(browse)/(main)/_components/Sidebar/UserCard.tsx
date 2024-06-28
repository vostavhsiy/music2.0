import { IUser } from "@/lib/types/IUser";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  user: IUser;
}

export const UserCard: FC<Props> = ({ user }) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex items-center justify-center lg:justify-start lg:gap-[10px] w-full p-[2px] rounded-[5px]"
    >
      <Image
        src={user.image || ""}
        alt={"user"}
        width={500}
        height={500}
        className="w-[25px] h-[25px] object-cover object-center rounded-full"
      />
      <h2 className="hidden lg:block text-sm font-semibold">{user.login}</h2>
    </Link>
  );
};
