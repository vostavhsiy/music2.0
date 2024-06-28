"use client";

import { FC, useTransition } from "react";
import { ISong } from "@/lib/types/ISong";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, X, Plus, Download } from "lucide-react";
import { deleteSong } from "@/actions/audio.actions";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPickedSongs } from "@/store/reducers/audio/reducer";
import { PlayerButton } from "@/components/Player/PlayerButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { downloadAudio } from "@/lib/services/audio.service";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Props {
  song: ISong;
  playlist?: ISong[];
  isInProfile?: boolean;
  inCreateMode?: boolean;
  inSearch?: boolean;
}

export const Song: FC<Props> = ({
  song,
  isInProfile,
  playlist,
  inCreateMode,
  inSearch,
}) => {
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();

  const pickedSongs = useAppSelector((state) => state.audio.pickedSongs);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl",
        inSearch ? "py-1" : "p-2"
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={song.image || "/logo.png"}
          alt={"user"}
          width={500}
          height={500}
          className={cn(
            "object-cover object-center rounded-full",
            inSearch ? "w-[30px] h-[30px]" : "w-[50px] h-[50px]"
          )}
        />
        <div className={cn("flex flex-col", inSearch ? "gap-0.5" : "gap-2")}>
          <h3>{song.title}</h3>
          <h4 className="text-sm text-zinc-500 font-semibold">{song.author}</h4>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {song.file && (
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                downloadAudio(song.file, song.title + ".mp3")
                  .then((file) => {
                    if (!file) {
                      return toast.error("Error");
                    }
                    toast.success("Downloaded!");
                  })
                  .catch((reason) => {
                    const e = reason as Error;
                    toast.error(reason.message);
                  });
              });
            }}
          >
            <Download />
          </Button>
        )}
        <PlayerButton song={song} playlist={playlist} />
        {isInProfile && (
          <Button
            disabled={isPending}
            variant={"destructive"}
            size={"icon"}
            onClick={async () => {
              startTransition(() => {
                deleteSong(song.id, song.image).then((res) => {
                  if (res) {
                    toast.success("Song deleted");
                  }
                });
              });
            }}
          >
            <Trash2 />
          </Button>
        )}
        {inCreateMode && (
          <Button
            disabled={isPending}
            variant={!pickedSongs.includes(song.id) ? "outline" : "destructive"}
            size={"icon"}
            onClick={async () => {
              startTransition(() => {
                dispatch(setPickedSongs(song.id));
              });
            }}
          >
            {!pickedSongs.includes(song.id) ? <Plus /> : <X />}
          </Button>
        )}
      </div>
    </div>
  );
};
