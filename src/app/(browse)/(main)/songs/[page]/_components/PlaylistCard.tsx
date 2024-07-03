import { IPlaylist } from "@/lib/types/IPlaylist";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  playlist: IPlaylist;
}

export const PlaylistCard: FC<Props> = ({ playlist }) => {
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="flex flex-col items-center gap-5 bg-secondary p-2 rounded-xl hover:underline"
    >
      <div
        className={
          "w-full aspect-square rounded-lg p-[3px] bg-gradient-to-r from-fuchsia-500 to-cyan-500"
        }
      >
        <Image
          src={playlist.image || "/logo.png"}
          alt={"user"}
          width={500}
          height={500}
          className="w-full h-full object-cover object-center rounded-lg bg-secondary"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-semibold">{playlist.title}</h3>
        <h4 className="text-base opacity-60">{playlist.author.login}</h4>
      </div>
    </Link>
  );
};
