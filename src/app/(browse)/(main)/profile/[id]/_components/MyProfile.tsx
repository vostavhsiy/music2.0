import { IUser } from "@/lib/types/IUser";
import React, { FC } from "react";
import Image from "next/image";
import { Song } from "@/components/Song";
import { CreateSongForm } from "@/app/(browse)/(main)/profile/[id]/_components/CreateSongForm";
import { Playlist } from "@/components/Player/Playlist";
import { CreatePlaylistForm } from "@/app/(browse)/(main)/profile/[id]/_components/CreatePlaylistForm";
import { PlaylistCard } from "@/components/PlaylistCard";
import { cn } from "@/lib/utils";

interface Props {
  profile: IUser;
}

export const MyProfile: FC<Props> = ({ profile }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className={"flex items-center gap-8"}>
        <div className="flex items-center gap-3 w-[50%]">
          <Image
            src={profile.image || "/logo.png"}
            alt={"user"}
            width={500}
            height={500}
            className="w-[100px] h-[100px] object-cover object-center rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{profile.login}</h3>
          </div>
        </div>
        <div className="w-full flex items-start justify-between gap-2">
          <div className="flex flex-col gap-3 w-[45%]">
            <h3 className="text-lg font-semibold">Add audio</h3>
            <CreateSongForm />
          </div>
          <div className="flex flex-col gap-3 w-[45%]">
            <h3 className="text-lg font-semibold">Create playlist</h3>
            <CreatePlaylistForm />
          </div>
        </div>
      </div>
      <div className={"flex items-start gap-[70px]"}>
        {!!profile.songs.length && (
          <div
            className={cn(
              "flex flex-col gap-5",
              !!profile.playlists.length ? "w-1/2" : "w-full",
            )}
          >
            <h2 className="text-lg font-semibold">Audio:</h2>
            <Playlist songs={profile.songs} isInProfile />
          </div>
        )}
        {!!profile.playlists.length && (
          <div className="flex flex-col gap-5 w-1/2">
            <h2 className="text-lg font-semibold">Playlists:</h2>
            <div className="flex flex-col gap-5">
              {profile.playlists.map((playlist) => {
                return (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    isInProfile
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
