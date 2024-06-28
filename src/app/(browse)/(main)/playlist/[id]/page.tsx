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
    <div className="flex flex-col gap-5 mb-[50px]">
      <h2 className="text-lg font-semibold mb-5">Playlist</h2>
      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-5">
          <Image
            src={playlist.image || "/logo.png"}
            alt={"user"}
            width={500}
            height={500}
            className="w-[150px] h-[150px] object-cover object-center rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-semibold">{playlist.title}</h3>
            <Link
              className="text-xl text-zinc-400 hover:underline"
              href={`/profile/${playlist.author.id}`}
            >
              {playlist.author.login}
            </Link>
          </div>
        </div>
        <div>
          <Playlist songs={playlist.songs} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
