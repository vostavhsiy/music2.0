"use client";

import React, { FC, useEffect, useRef, useState, useTransition } from "react";
import { ISong } from "@/lib/types/ISong";
import { IUser } from "@/lib/types/IUser";
import { getUsersPage } from "@/lib/services/users.service";
import { getPlaylistPage, getSongsPage } from "@/lib/services/audio.service";
import { IPlaylist } from "@/lib/types/IPlaylist";
import { Input } from "@/components/ui/input";
import { searchSubmitHandler } from "@/actions/search.actions";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Song } from "@/components/Song";
import Link from "next/link";
import Image from "next/image";
import { Music, Users, BookAudio, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 300);
  const [songs, setSongs] = useState<ISong[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  const [isPending, startTransition] = useTransition();

  const [isActive, setActive] = useState(false);

  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (debounceSearch) {
      getUsersPage(0, debounceSearch, 3).then((res) => {
        if (res?.users) setUsers(res.users);
      });
      getSongsPage(0, debounceSearch, 2).then((res) => {
        if (res?.songs) setSongs(res.songs);
      });
      getPlaylistPage(0, debounceSearch, 2).then((res) => {
        if (res?.playlists) setPlaylists(res.playlists);
      });
    } else {
      setUsers([]);
      setSongs([]);
      setPlaylists([]);
    }
  }, [debounceSearch]);

  const close = () => {
    setActive(false);
    setSearch("");
    setUsers([]);
    setSongs([]);
    setPlaylists([]);
  };

  const submitHandler = (data: FormData) => {
    const search = data.get("search");
    if (!search) return;
    form.current?.reset();
    close();
  };

  return (
    <div className={cn("relative h-[60%]", className || "")}>
      <Dialog
        open={isActive}
        onOpenChange={(open) => {
          if (!open) {
            close();
          }
        }}
      >
        <DialogTrigger
          asChild
          onClick={() => {
            setActive(true);
          }}
        >
          <Button
            variant="outline"
            className={
              "w-full flex items-center gap-4 bg-white text-black hover:bg-white/80 hover:text-black"
            }
          >
            <span className={"hidden lg:block"}>
              Search for songs, playlists, etc.
            </span>
            <span>
              <Search size={20} />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[425px] p-0 gap-1">
          <form action={submitHandler} ref={form} className="w-full">
            <Input
              disabled={isPending}
              name={"search"}
              autoComplete={"off"}
              onChange={(event) => {
                setSearch(event.currentTarget.value);
              }}
              placeholder="Type a title or login..."
              className={
                "outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[48px]"
              }
            />
          </form>
          {(!!songs.length || !!users.length || !!playlists.length) && (
            <div className="p-3 flex flex-col gap-3 overflow-auto">
              {!!songs.length && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-semibold">Audio</h4>
                  <div className="flex flex-col gap-2">
                    {songs.map((song) => {
                      return <Song key={song.id} song={song} inSearch />;
                    })}
                  </div>
                  <Link
                    onClick={() => {
                      close();
                    }}
                    className={"text-start font-semibold text-zinc-500 text-sm"}
                    href={`/songs/1?search=${search}`}
                  >
                    All results
                  </Link>
                </div>
              )}
              {!!playlists.length && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-semibold">Playlists</h4>
                  <div className="flex flex-col gap-2">
                    {playlists.map((playlist) => {
                      return (
                        <Link
                          href={`/playlist/${playlist.id}`}
                          key={playlist.id}
                          className="flex items-center gap-2"
                        >
                          <Image
                            alt={"user"}
                            src={playlist.image || "/logo.png"}
                            width={500}
                            height={500}
                            className="w-[30px] h-[30px] object-cover object-center rounded-full"
                          />
                          <h4>{playlist.title}</h4>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    onClick={() => {
                      close();
                    }}
                    className={"text-start font-semibold text-zinc-500 text-sm"}
                    href={`/playlists/1?search=${search}`}
                  >
                    All results
                  </Link>
                </div>
              )}
              {!!users.length && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-semibold">Users</h4>
                  <div className="flex flex-col gap-2">
                    {users.map((user) => {
                      return (
                        <Link
                          href={`/profile/${user.id}`}
                          key={user.id}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={user.image || "/logo.png"}
                            alt={"user"}
                            width={500}
                            height={500}
                            className="w-[30px] h-[30px] object-cover object-center rounded-full"
                          />
                          <h4>{user.login}</h4>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    onClick={() => {
                      close();
                    }}
                    className={"text-start font-semibold text-zinc-500 text-sm"}
                    href={`/users/1?search=${search}`}
                  >
                    All results
                  </Link>
                </div>
              )}
            </div>
          )}
          {!search && (
            <div className="p-3 flex flex-col gap-3">
              <Link
                href={"/songs/1"}
                className="hover:text-destructive transition-all flex items-center gap-3"
                onClick={() => {
                  close();
                }}
              >
                <Music />
                <span>Audio</span>
              </Link>
              <Link
                href={"/playlists/1"}
                className="hover:text-destructive transition-all flex items-center gap-3"
                onClick={() => {
                  close();
                }}
              >
                <BookAudio />
                <span>Playlists</span>
              </Link>
              <Link
                href={"/users/1"}
                className="hover:text-destructive transition-all flex items-center gap-3"
                onClick={() => {
                  close();
                }}
              >
                <Users />
                <span>Community</span>
              </Link>
            </div>
          )}
          {search && !songs.length && !users.length && !playlists.length && (
            <div className="flex items-center justify-center p-2 pb-4">
              <h2>No results found.</h2>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
