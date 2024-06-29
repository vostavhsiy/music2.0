"use client";

import { IPlaylist } from "@/lib/types/IPlaylist";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  playlist: IPlaylist;
}

export function UserPlaylist({ playlist }: Props) {
  return (
    <div
      className={cn(
        "select-none flex flex-col gap-4 rounded-xl bg-secondary p-2"
      )}
    >
      <div className="p-[2px] bg-gradient-to-r from-teal-400 to-yellow-200 rounded-lg">
        <Image
          src={playlist.image || "/logo.png"}
          alt={"user"}
          width={500}
          height={500}
          className={cn(
            "rounded-lg w-full aspect-square object-cover object-center"
          )}
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className={cn("w-full flex flex-col items-start gap-2 p-3")}>
          <Link href={`/playlist/${playlist.id}`} className="text-xl text-start font-semibold hover:underline">{playlist.title}</Link>
        </div>
      </div>
    </div>
  );
}
