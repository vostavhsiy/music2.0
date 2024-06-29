import { IUser } from "@/lib/types/IUser";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
}

export function PopularUser({ user }: Props) {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex items-center gap-6 transition-colors hover:bg-primary hover:text-background  p-8"
    >
      <Image
        src={user.image || "/user.webp"}
        alt="user"
        width={500}
        height={500}
        className="w-[70px] aspect-square rounded-full"
      />
      <h3 className="font-semibold text-2xl">{user.login}</h3>
    </Link>
  );
}
