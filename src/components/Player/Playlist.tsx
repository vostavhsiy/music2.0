import React, { FC } from "react";
import { ISong } from "@/lib/types/ISong";
import { Song } from "@/components/Song";

interface Props {
  songs: ISong[];
  isInProfile?: boolean;
  inCreateMode?: boolean;
}

export const Playlist: FC<Props> = ({ songs, isInProfile, inCreateMode }) => {
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
          />
        );
      })}
    </div>
  );
};
