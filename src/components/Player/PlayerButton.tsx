import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ISong } from "@/lib/types/ISong";
import { FC } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setCurrentPlaylist,
  setCurrentSong,
  setPause,
} from "@/store/reducers/audio/reducer";
import { Pause, Play } from "lucide-react";

interface Props {
  song: ISong;
  playlist?: ISong[];
}

export const PlayerButton: FC<Props> = ({ song, playlist }) => {
  const dispatch = useAppDispatch();

  const player = useAppSelector((state) => state.audio.player);
  const pause = useAppSelector((state) => state.audio.pause);
  const currentSong = useAppSelector((state) => state.audio.currentSong);

  return (
    <Button
      variant="ghost"
      size={"icon"}
      onClick={async () => {
        if (playlist) dispatch(setCurrentPlaylist(playlist));
        if (currentSong?.id !== song.id) {
          return dispatch(setCurrentSong(song));
        }
        if (player) {
          if (pause) {
            dispatch(setPause(false));
            await player.play();
          } else {
            dispatch(setPause(true));
            player.stop();
          }
        }
      }}
      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-8 h-auto aspect-square "
    >
      {currentSong?.id === song.id ? (
        pause ? (
          <Play className="w-5 aspect-square" />
        ) : (
          <Pause className="w-5 aspect-square" />
        )
      ) : (
        <Play className="w-5 aspect-square" />
      )}
    </Button>
  );
};
