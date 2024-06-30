import { IUser } from "@/lib/types/IUser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
  isLast?: boolean;
  isEven?: boolean;
}

export function PopularUser({ user, isLast, isEven }: Props) {
  return (
    <Link
      href={`/profile/${user.id}`}
      className={cn(
        "flex items-center gap-6 transition-colors bg-secondary/90 hover:bg-primary hover:text-background hover:underline p-3 border-r-4 border-slate-500",
        isLast && "border-none",
        isEven && "bg-gradient-to-r from-fuchsia-500 to-pink-500",
      )}
    >
      <Image
        src={user.image || "/user.webp"}
        alt="user"
        width={500}
        height={500}
        className="w-[40px] aspect-square rounded-full"
      />
      <h3 className="font-semibold text-base text-wrap">{user.login}</h3>
    </Link>
  );
}
