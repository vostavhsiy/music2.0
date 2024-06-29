import { IUser } from "@/lib/types/IUser";
import { PopularUser } from "./PopularUser";
import { ReactNode } from "react";

interface Props {
  users: IUser[];
  title?: ReactNode;
}

export function PopularUsers({ users, title }: Props) {
  return (
    <div className="w-full flex flex-col gap-10">
      <h2 className="text-4xl font-bold">
        {title || (
          <>
            Popular{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              users
            </span>
          </>
        )}
      </h2>
      <div className="w-full p-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500">
        <div className="w-full flex flex-col rounded-xl bg-secondary overflow-hidden">
          {users.map((user, index) => {
            return (
              <div className="flex flex-col">
                <PopularUser key={user.id} user={user} />
                {index < users.length - 1 && (
                  <div className="w-full h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
