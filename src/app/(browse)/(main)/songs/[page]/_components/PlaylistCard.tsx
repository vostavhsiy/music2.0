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
      className="flex flex-col items-center gap-5 bg-primary-foreground p-5 rounded-2xl"
    >
      <Image
        src={playlist.image || "/logo.png"}
        alt={"user"}
        width={500}
        height={500}
        className="w-[150px] h-[150px] object-cover object-center rounded-full"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-semibold">{playlist.title}</h3>
        <h4 className="text-base opacity-60">{playlist.author.login}</h4>
      </div>
    </Link>
  );
};
