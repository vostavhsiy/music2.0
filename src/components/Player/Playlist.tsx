import React, { FC } from "react";
import { ISong } from "@/lib/types/ISong";
import { Song } from "@/components/Song";

interface Props {
  songs: ISong[];
  isInProfile?: boolean;
  inCreateMode?: boolean;
  inEditMode?: boolean;
  select?: (id: string) => void;
  pickedSongs?: string[];
}

export const Playlist: FC<Props> = ({
  songs,
  isInProfile,
  inCreateMode,
  inEditMode,
  select,
  pickedSongs,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {songs.map((song) => {
        return (
          <Song
            key={song.id}
            song={song}
            isInProfile={isInProfile}
            playlist={songs}
            inCreateMode={inCreateMode}
            inEditMode={inEditMode}
            select={select}
            isEditPicked={!!pickedSongs?.includes(song.id)}
          />
        );
      })}
    </div>
  );
};
