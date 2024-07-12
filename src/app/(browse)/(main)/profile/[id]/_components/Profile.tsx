"use client";

import { IUser } from "@/lib/types/IUser";
import React, { FC, useTransition } from "react";
import Image from "next/image";
import { Song } from "@/components/Song";
import { Playlist } from "@/components/Player/Playlist";
import { cn } from "@/lib/utils";
import { PlaylistCard } from "@/components/PlaylistCard";
import { follow, unfollow } from "@/lib/services/users.service";
import { Button } from "@/components/ui/button";

interface Props {
  profile: IUser;
  isAuth?: boolean;
  isFollow?: boolean;
}

export const Profile: FC<Props> = ({ profile, isFollow, isAuth }) => {
  const [isPending, startTransition] = useTransition();

  const clickHandler = async () => {
    if (isAuth) {
      if (isFollow) {
        startTransition(() => {
          unfollow(profile.id);
        });
        // await unfollow(user.id);
      } else {
        startTransition(() => {
          follow(profile.id);
        });
        //await follow(user.id);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Image
          src={profile.image || "/logo.png"}
          alt={"user"}
          width={500}
          height={500}
          className="w-[100px] h-[100px] object-cover object-center rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{profile.login}</h3>
          {isAuth && (
            <Button
              variant="secondary"
              className=""
              size="sm"
              disabled={isPending}
              onClick={clickHandler}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </div>
      <div className={"flex items-start gap-[70px]"}>
        {!!profile.songs.length && (
          <div
            className={cn(
              "flex flex-col gap-5",
              !!profile.playlists.length ? "w-3/5" : "w-full",
            )}
          >
            <h2 className="text-lg font-semibold">Audio:</h2>
            <Playlist songs={profile.songs} />
          </div>
        )}
        {!!profile.playlists.length && (
          <div className="flex flex-col gap-5 w-2/5">
            <h2 className="text-lg font-semibold">Playlists:</h2>
            <div className="flex flex-col gap-5">
              {profile.playlists.map((playlist) => {
                return <PlaylistCard key={playlist.id} playlist={playlist} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
