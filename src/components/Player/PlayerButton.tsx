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
      variant="secondary"
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
    >
      {currentSong?.id === song.id ? pause ? <Play /> : <Pause /> : <Play />}
    </Button>
  );
};
