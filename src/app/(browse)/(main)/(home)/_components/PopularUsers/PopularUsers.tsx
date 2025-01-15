import { IUser } from "@/lib/types/IUser";
import { PopularUser } from "./PopularUser";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./popular-users.module.scss";

interface Props {
  users: IUser[];
  title?: ReactNode;
}

export function PopularUsers({ users, title }: Props) {
  return (
    <div className="w-full flex flex-col gap-10">
      <h2 className="text-4xl mb:max-md:text-3xl text-center font-bold">
        {title || (
          <>
            Popular{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              users
            </span>
          </>
        )}
      </h2>
      <div className="mx-auto w-[90%] p-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500">
        <div
          className={cn(
            "w-full grid grid-cols-4 mb:max-lg:grid-cols-1 rounded-xl bg-secondary overflow-hidden",
            styles.bg,
          )}
        >
          {users.map((user, index) => {
            return (
              <PopularUser
                isEven={index % 2 === (title ? 0 : 1)}
                isLast={!!index && index === users.length - 1}
                key={user.id}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
