"use client";

import { IPlaylist } from "@/lib/types/IPlaylist";
import React, { FC, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePlaylist } from "@/actions/audio.actions";
import { toast } from "sonner";
import { Playlist } from "@/components/Player/Playlist";
import Link from "next/link";

interface Props {
  playlist: IPlaylist;
  isInProfile?: boolean;
}

export const PlaylistCard: FC<Props> = ({ playlist, isInProfile }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/playlist/${playlist.id}`}
        className="flex items-center gap-2"
      >
        <Image
          src={playlist.image || "/logo.png"}
          alt={"user"}
          width={500}
          height={500}
          className="w-[50px] h-[50px] object-cover object-center rounded-full"
        />
        <h3>{playlist.title}</h3>
      </Link>
      <div className="flex items-center gap-2">
        {isInProfile && (
          <Button
            disabled={isPending}
            size={"icon"}
            variant={"destructive"}
            onClick={async () => {
              startTransition(() => {
                deletePlaylist(playlist.id, playlist.image).then((res) => {
                  if (res) {
                    toast.success("Playlist deleted");
                  }
                });
              });
            }}
          >
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  );
};
