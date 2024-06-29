import { ISong } from "@/lib/types/ISong";
import React, { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Playlist } from "@/components/Player/Playlist";
import { ListRestart } from "lucide-react";

interface Props {
  songs: ISong[];
  children?: ReactNode;
}

export const LastListens: FC<Props> = ({ songs, children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant={"outline"} size={"icon"}>
            <ListRestart />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="flex flex-col gap-5 rounded-t-3xl h-[80%] overflow-auto"
      >
        <SheetHeader className="font-semibold">
          Недавно прослушанные
        </SheetHeader>
        {songs && songs.length ? (
          <Playlist songs={songs} />
        ) : (
          <h4 className="text-lg text-destructive">Нет аудиозаписей!</h4>
        )}
      </SheetContent>
    </Sheet>
  );
};
