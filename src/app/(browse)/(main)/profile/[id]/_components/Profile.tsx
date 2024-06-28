import { IUser } from "@/lib/types/IUser";
import React, { FC } from "react";
import Image from "next/image";
import { Song } from "@/components/Song";

interface Props {
  profile: IUser;
}

export const MyProfile: FC<Props> = ({ profile }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Image
          src={profile.image || "/logo.png"}
          alt={"user"}
          width={500}
          height={500}
          className="w-[100px] h-[100px] object-cover object-center rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-lg text-bold">{profile.login}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {profile.songs.map((song) => {
          return (
            <Song
              key={song.id}
              song={song}
              isInProfile={song.userid === profile.id}
            />
          );
        })}
      </div>
    </div>
  );
};
