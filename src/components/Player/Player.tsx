"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setCurrentTime,
  setCurrentSong,
  setCurrentVolume,
  setPause,
  setPlayer,
  setMode,
} from "@/store/reducers/audio/reducer";
import { AudioPlayer } from "@/lib/Audio";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  Pause,
  Play,
  Repeat,
  StepBack,
  StepForward,
  Volume,
  Volume1,
  Volume2,
  X,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import convertTime from "@/lib/convertTime";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { addListenToSong } from "@/actions/audio.actions";

export const Player = () => {
  const dispatch = useAppDispatch();

  const player = useAppSelector((state) => state.audio.player);
  const currentSong = useAppSelector((state) => state.audio.currentSong);
  const pause = useAppSelector((state) => state.audio.pause);
  const playlist = useAppSelector((state) => state.audio.currentPlaylist);
  const mode = useAppSelector((state) => state.audio.mode);

  const [fetching, setFetching] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    dispatch(setPlayer(new AudioPlayer()));
  }, []);

  const next = () => {
    if (player && playlist && currentSong) {
      setDirection("next");
      const index = playlist.findIndex((song) => song.id === currentSong.id);
      //player.stop();
      if (index < playlist.length - 1) {
        return dispatch(setCurrentSong(playlist[index + 1]));
      }
      if (index === playlist.length - 1) {
        if (mode === "linear" || mode === "loop") return;
        return dispatch(setCurrentSong(playlist[0]));
      }
    }
  };

  const prev = () => {
    if (player && playlist && currentSong) {
      setDirection("prev");
      const index = playlist.findIndex((song) => song.id === currentSong.id);
      //player.stop();
      if (index > 0) {
        return dispatch(setCurrentSong(playlist[index - 1]));
      }
      if (index === 0) {
        if (mode === "linear" || mode === "loop") return;
        return dispatch(setCurrentSong(playlist[playlist.length - 1]));
      }
    }
  };

  const isLast = useMemo(() => {
    if (currentSong && playlist) {
      const index = playlist.findIndex((song) => song.id === currentSong.id);
      return index === playlist.length - 1;
    }
  }, [playlist, currentSong]);

  useEffect(() => {
    if (!currentSong) {
      player?.stop();
      return;
    }
    if (player && currentSong) {
      setFetching(true);
      player
        .src(currentSong.file.replace("localhost", "localhost"))
        .then((res) => {
          dispatch(setPause(false));
          setFetching(false);
          player.player.ontimeupdate = () => {
            dispatch(setCurrentTime(player.player.currentTime));
          };
          addListenToSong(currentSong.id);
        })
        .catch(() => {
          if (direction === "next") next();
          else prev();
        });
    }
  }, [currentSong]);

  useEffect(() => {
    if (player) {
      player.player.loop = mode === "loop";
      player.player.onended = () => {
        dispatch(setPause(true));
        player.stop();
        if (playlist) {
          if (mode !== "loop") {
            if (!isLast || mode === "playlist") {
              next();
            }
          }
        }
      };
    }
  }, [mode, currentSong, playlist]);

  if (!currentSong) return null;
  if (!player) return null;

  return (
    <div
      className={cn(
        "fixed z-[1000] bottom-0 left-1/2 p-3 rounded-xl rounded-b-none -translate-x-1/2 bg-background border-[3px] backdrop-blur flex flex-col items-start justify-between animate-in duration-500",
        collapse ? "w-[13%]" : "w-4/5 gap-3",
      )}
    >
      {!collapse && (
        <Button
          size={"xxl"}
          variant={"secondary"}
          className="absolute top-[10px] right-[10px] z-[1]"
          onClick={() => {
            dispatch(setCurrentSong(null));
          }}
        >
          <X />
        </Button>
      )}
      <div
        className={cn(
          "relative flex items-center w-full",
          collapse ? "justify-center" : "pl-3 gap-10",
        )}
      >
        {!collapse && (
          <div className="flex items-center gap-3">
            <Image
              src={currentSong.image || "/logo.png"}
              alt={"audio"}
              width={500}
              height={500}
              className="w-[50px] h-[50px] object-cover object-center rounded-xl"
            />
            <div className="flex flex-col items-start overflow-hidden">
              <h4 className="text-lg font-bold text-nowrap max-w-[50%]">
                {currentSong.title}
              </h4>
              <h5 className="text-sm font-semibold text-zinc-500 text-nowrap">
                {currentSong.author}
              </h5>
            </div>
          </div>
        )}

        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <Button
            disabled={fetching}
            onClick={async () => {
              prev();
            }}
          >
            <StepBack />
          </Button>
          <Button
            variant={!pause ? "destructive" : "default"}
            disabled={fetching}
            onClick={async () => {
              if (player.player.paused) {
                dispatch(setPause(false));
                return await player.play();
              }
              dispatch(setPause(true));
              return player.stop();
            }}
          >
            {pause ? <Play /> : <Pause />}
          </Button>
          <Button
            disabled={fetching}
            onClick={async () => {
              next();
            }}
          >
            <StepForward />
          </Button>
        </div>
      </div>
      {!collapse && (
        <div className="w-3/4 mx-auto p-3 py-0">
          <TrackDuration player={player} />
        </div>
      )}
    </div>
  );
};

const TrackDuration: FC<{ player: AudioPlayer }> = ({ player }) => {
  const dispatch = useAppDispatch();

  const time = useAppSelector((state) => state.audio.currentTime);
  const mode = useAppSelector((state) => state.audio.mode);
  const pause = useAppSelector((state) => state.audio.pause);

  return (
    <div className="flex flex-col gap-4">
      <Slider
        value={[time]}
        max={player.player.duration}
        onValueChange={([value]) => {
          dispatch(setCurrentTime(value));
          if (!player.player.paused) player.stop();
        }}
        onValueCommit={async ([value]) => {
          dispatch(setCurrentTime(value));
          player.time = value;
          if (player.player.paused && !pause) await player.play();
        }}
      />
      <div className="flex items-center gap-[40px] h-5">
        <div className="flex items-center gap-[40px] w-[20%] h-full">
          <h5 className="w-5">{convertTime(player.player.duration - time)}</h5>
          <TrackVolume player={player} />
        </div>
        <Button
          size="xxl"
          variant="outline"
          className="relative bg-primary-foreground text-primary"
          style={
            mode === "playlist" || mode === "loop"
              ? {
                  color: "hsl(var(--destructive))",
                }
              : {}
          }
          onClick={() => {
            if (mode === "linear") {
              dispatch(setMode("playlist"));
              return;
            }
            if (mode === "playlist") {
              dispatch(setMode("loop"));
              return;
            }
            dispatch(setMode("linear"));
          }}
        >
          <Repeat />
          {mode === "loop" && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px]">
              1
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

const TrackVolume: FC<{ player: AudioPlayer }> = ({ player }) => {
  const dispatch = useAppDispatch();

  const volume = useAppSelector((state) => state.audio.currentVolume);

  useEffect(() => {
    player.volume = volume / 100;
  }, []);

  return (
    <div className="flex items-center w-[100%]">
      <Button variant={"link"} size={"icon"}>
        {volume === 0 && <Volume />}
        {volume > 0 && volume <= 50 && <Volume1 />}
        {volume > 50 && <Volume2 />}
      </Button>
      <Slider
        value={[volume]}
        max={100}
        onValueChange={([value]) => {
          dispatch(setCurrentVolume(value));
          player.volume = value / 100;
        }}
      />
    </div>
  );
};
