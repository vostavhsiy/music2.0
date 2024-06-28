"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListMusic, ListRestart } from "lucide-react";
import { Playlist } from "@/components/Player/Playlist";
import React from "react";

export const CurrentPlaylist = () => {
  const playlist = useAppSelector((state) => state.audio.currentPlaylist);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <ListMusic />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="flex flex-col gap-5 rounded-t-3xl h-[80%] overflow-auto"
      >
        <SheetHeader className="font-semibold">Текущий плейлист</SheetHeader>
        {playlist ? (
          <Playlist songs={playlist} />
        ) : (
          <h4 className="text-lg text-destructive">Нет аудиозаписей!</h4>
        )}
      </SheetContent>
    </Sheet>
  );
};
