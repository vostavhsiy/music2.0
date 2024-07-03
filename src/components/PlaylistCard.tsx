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
import { cn } from "@/lib/utils";
import { EditPlaylistForm } from "@/app/(browse)/(main)/dashboard/_components/EditPlaylistForm";

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
        className="flex items-center gap-4 hover:underline"
      >
        <div
          className={cn(
            "w-[70px] bg-gradient-to-r from-teal-400 to-yellow-200 p-[2px] aspect-square",
          )}
        >
          <Image
            src={playlist.image || "/logo.png"}
            alt={"user"}
            width={500}
            height={500}
            className={cn(
              "bg-secondary object-cover object-center w-full h-full",
            )}
          />
        </div>
        <h3 className={"text-lg"}>{playlist.title}</h3>
      </Link>
      <div className="flex items-center gap-2">
        {isInProfile && (
          <>
            <EditPlaylistForm playlist={playlist} />
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
            </Button>{" "}
          </>
        )}
      </div>
    </div>
  );
};
