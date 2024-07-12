import { NextPage } from "next";
import { redirect } from "next/navigation";
import { AudioApi } from "@/lib/api/api.audio";
import Image from "next/image";
import React from "react";
import { Playlist } from "@/components/Player/Playlist";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 3600;
const PlaylistPage: NextPage<Props> = async ({ params: { id } }) => {
  if (!id) redirect("/playlists/1");

  const playlist = await AudioApi.getPlaylist(id);
  if (!playlist) {
    redirect("/playlists/1");
  }
  if (playlist.message) {
    redirect("/playlists/1");
  }

  return (
    <div className={"flex flex-col"}>
      <div>
        <div className="w-[95%] pb-14 mx-auto flex items-start gap-8">
          <Image
            src={playlist.image || "/logo.png"}
            alt={"user"}
            width={500}
            height={500}
            className="w-[200px] aspect-square object-cover object-center rounded-xl"
          />
          <div className="flex flex-col gap-4">
            <div className={"uppercase text-sm font-semibold"}>Playlist</div>
            <h3 className="text-8xl font-semibold">{playlist.title}</h3>
            <div className="text-xl">
              Made by
              <Link
                className="ml-2 pr-4 border-r-[3px] border-r-primary/50 font-semibold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent"
                href={`/profile/${playlist.author.id}`}
              >
                {playlist.author.login}
              </Link>
              <span className={"ml-4"}>{playlist.songs.length} songs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mb-[50px]">
        <div>
          <div
            className={
              "grid grid-cols-[50px_1fr_50%] text-primary/40 uppercase text-sm font-semibold"
            }
          >
            <div></div>
            <div>Title</div>
            <div className={"flex justify-end items-center gap-2"}>
              <div className="mr-10">date added</div>
              <div className="w-1/2">added by</div>
              <div className="w-[40px]"></div>
            </div>
          </div>
          <div
            className={"ml-[50px] h-[2px] bg-primary/30 rounded-xl mt-3"}
          ></div>
        </div>
        {!!playlist.songs.length ? (
          <Playlist songs={playlist.songs} />
        ) : (
          <h2 className={"ml-[50px]"}>No audio!</h2>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
