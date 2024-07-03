"use client";

import { FC, useState, useTransition } from "react";
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
import Link from "next/link";
import { getDateInterval } from "@/lib/getDateInterval";

interface Props {
  song: ISong;
  playlist?: ISong[];
  isInProfile?: boolean;
  inCreateMode?: boolean;
  inEditMode?: boolean;
  inSearch?: boolean;
  select?: (id: string) => void;
  isEditPicked?: boolean;
}

export const Song: FC<Props> = ({
  song,
  isInProfile,
  playlist,
  inCreateMode,
  inEditMode,
  inSearch,
  select,
  isEditPicked,
}) => {
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();
  const [downloadPending, setDownloadPending] = useState(false);

  const pickedSongs = useAppSelector((state) => state.audio.pickedSongs);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl",
        inSearch ? "py-1" : "p-2",
      )}
    >
      <div className="flex items-center gap-3">
        <PlayerButton song={song} playlist={playlist} />
        {!inSearch && (
          <Image
            src={song.image || "/logo.png"}
            alt={"user"}
            width={500}
            height={500}
            className={cn(
              "object-cover object-center rounded aspect-square",
              inSearch ? "w-[30px]" : "w-[70px]",
            )}
          />
        )}
        <div className={cn("flex flex-col", inSearch ? "gap-0.5" : "gap-2")}>
          <h3>{song.title}</h3>
          <h4 className="text-sm text-zinc-500 font-semibold">{song.author}</h4>
        </div>
      </div>
      <div
        className={cn(
          !inSearch && "w-1/2",
          "flex justify-end items-center gap-2",
        )}
      >
        {!inSearch && (
          <>
            <p className={"font-semibold mr-10 text-primary/70"}>
              {getDateInterval(song.createdAt)}
            </p>
            {!isInProfile && (
              <Link
                href={`/profile/${song.userid}`}
                className="w-1/2 flex items-center gap-3"
              >
                <div
                  className={cn(
                    "bg-gradient-to-r from-teal-400 to-yellow-200 p-[2px] rounded-full aspect-square",
                    inSearch ? "w-[20px]" : "w-[50px]",
                  )}
                >
                  <Image
                    src={song.person.image || "/logo.png"}
                    alt={"user"}
                    width={500}
                    height={500}
                    className={cn(
                      "bg-secondary object-cover object-center rounded-full w-full h-full",
                    )}
                  />
                </div>
                <h3>{song.person.login}</h3>
              </Link>
            )}
          </>
        )}
        {song.file && (
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={isPending || downloadPending}
            onClick={() => {
              setDownloadPending(true);
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
                  })
                  .finally(() => {
                    setDownloadPending(false);
                  });
              });
            }}
          >
            <Download />
          </Button>
        )}
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
        {inEditMode && (
          <Button
            disabled={isPending}
            variant={isEditPicked ? "outline" : "destructive"}
            size={"icon"}
            onClick={async () => {
              startTransition(() => {
                select && select(song.id);
              });
            }}
          >
            {!isEditPicked ? <Plus /> : <X />}
          </Button>
        )}
      </div>
    </div>
  );
};
