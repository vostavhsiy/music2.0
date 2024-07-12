"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createPlaylist, createSong } from "@/actions/audio.actions";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSongs } from "@/store/reducers/audio/actionCreators";
import { setPickedSongs, setSelectPage } from "@/store/reducers/audio/reducer";
import { Playlist } from "@/components/Player/Playlist";
import { StepBack, StepForward, X, XCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreatePlaylistForm = () => {
  const dispatch = useAppDispatch();

  const form = useRef<HTMLFormElement>(null);
  const searchForm = useRef<HTMLFormElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const pickedSongs = useAppSelector((state) => state.audio.pickedSongs);
  const page = useAppSelector((state) => state.audio.selectPage);
  const songs = useAppSelector((state) => state.audio.selectSearchSongs);
  const total = useAppSelector((state) => state.audio.selectSearchSongsCount);

  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(false);

  useEffect(() => {
    dispatch(getSongs({ page, search, size: 5 }));
  }, [search, page]);

  const submitHandler = async (data: FormData) => {
    if (!data.get("title")) return;
    if (!pickedSongs.length) {
      return toast.error("Pick at least one song!");
    }
    data.set("songs", JSON.stringify(pickedSongs.map((s) => ({ id: s }))));
    startTransition(() => {
      createPlaylist(data).then((res) => {
        if (res) {
          toast.success("Playlist is created!");
          form.current?.reset();
          setFile(null);
          dispatch(setPickedSongs(null));
        }
      });
    });
  };

  const close = () => {
    setSelect(false);
    setSearch("");
    dispatch(setSelectPage(0));
  };

  const searchSubmitHandler = (data: FormData) => {
    dispatch(setSelectPage(0));
    setSearch(data.get("search") as string);
  };

  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            form.current?.reset();
            setFile(null);
            dispatch(setPickedSongs(null));
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="default" size={"lg"}>
            Create new playlist
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create playlist</DialogTitle>
            <DialogDescription>
              Describe your playlist here. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <form
            ref={form}
            action={submitHandler}
            className="flex flex-col gap-[20px] text-primary"
          >
            <Input name="title" placeholder="Title" />
            <Input name="image" file={file} setFile={setFile} type={"file"} />
            <Dialog
              open={select}
              onOpenChange={(open) => {
                if (!open) {
                  close();
                }
              }}
            >
              <DialogTrigger
                asChild
                disabled={isPending}
                onClick={() => {
                  setSelect(true);
                }}
              >
                <Button disabled={isPending} type={"button"}>
                  Add audio to playlist{" "}
                  {!!pickedSongs?.length && `(${pickedSongs.length})`}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[80%] h-[90%] bg-secondary/90 backdrop-blur py-0 max-w-screen-lg">
                <div className="p-3 rounded-2xl flex flex-col gap-5">
                  <form
                    ref={searchForm}
                    action={searchSubmitHandler}
                    className="flex items-center gap-2 w-[80%]"
                  >
                    <Input name={"search"} placeholder={"Search"} />
                    <Button type={"submit"}>Search</Button>
                  </form>
                  {!!songs.length ? (
                    <>
                      <div className="h-[75%] overflow-auto">
                        <Playlist songs={songs} inCreateMode />
                      </div>
                      <div className="flex items-center gap-4 justify-end">
                        <h4 className="font-semibold">
                          Page {page + 1} of {Math.ceil(total / 5)}
                        </h4>
                        <div className="flex items-center gap-1">
                          <Button
                            disabled={page === 0}
                            onClick={() => {
                              if (page > 0) dispatch(setSelectPage(page - 1));
                            }}
                          >
                            <StepBack />
                          </Button>
                          <Button
                            disabled={page === Math.ceil(total / 5) - 1}
                            onClick={() => {
                              if (page < Math.ceil(total / 5) - 1)
                                dispatch(setSelectPage(page + 1));
                            }}
                          >
                            <StepForward />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <h3>No results found.</h3>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Button disabled={isPending} type="submit">
              Create playlist
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
