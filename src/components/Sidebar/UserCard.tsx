import { IUser } from "@/lib/types/IUser";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  user: IUser;
  collapse?: boolean;
}

export const UserCard: FC<Props> = ({ user, collapse }) => {

  return (
    <Link
      href={`/profile/${user.id}`}
      className={cn(
        "flex items-center justify-center lg:justify-start lg:gap-[10px] w-full p-[2px] rounded-[5px]",
        collapse && "!justify-center"
      )}
    >
      <Image
        src={user.image || "/user.webp"}
        alt={"user"}
        width={500}
        height={500}
        className="w-[30px] h-[30px] object-cover object-center rounded-full border"
      />
      {!collapse && (
        <h2 className="hidden lg:block text-sm font-semibold text-nowrap">
          {user.login}
        </h2>
      )}
    </Link>
  );
};
