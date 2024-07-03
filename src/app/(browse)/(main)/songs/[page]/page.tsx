import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { Pagination } from "@/components/Pagination";
import { getSongsPage } from "@/lib/services/audio.service";
import { Song } from "@/components/Song";
import { currentUser } from "@/lib/services/auth.service";
import { Playlist } from "@/components/Player/Playlist";
import { redirect } from "next/navigation";
import { Sort } from "@/app/(browse)/(main)/_components/Sort";
import { SongSortType } from "@/lib/api/api.audio";
import React from "react";

const SongsPage = async ({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: {
    size: string;
    search: string;
    sortBy?: SongSortType;
  };
}) => {
  const res = await getSongsPage(
    +params.page - 1,
    searchParams.search,
    10,
    searchParams.sortBy,
  );

  const user = await currentUser();

  if (!res?.songs) redirect("/");

  return (
    <div>
      <div className={"mb-5 flex justify-end"}>
        <Sort
          items={[
            { label: "Listens", value: "/songs/1?sortBy=listens" },
            { label: "Name", value: "/songs/1?sortBy=name" },
            { label: "Created at (desc)", value: "/songs/1?sortBy=new" },
            { label: "Created at (asc)", value: "/songs/1?sortBy=old" },
          ]}
          defaultValue={
            searchParams.sortBy && `/songs/1?sortBy=${searchParams.sortBy}`
          }
        />
      </div>
      <div>
        <div
          className={
            "grid grid-cols-[50px_1fr_50%] text-primary/40 uppercase text-sm font-semibold"
          }
        >
          <div></div>
          <div>Title</div>
          <div className={"flex justify-end items-center gap-2"}>
            <div className="mr-10">date added</div>
            <div className="w-1/2">added by</div>
            <div className="w-[40px]"></div>
          </div>
        </div>
        <div
          className={"ml-[50px] h-[2px] bg-primary/30 rounded-xl mt-3"}
        ></div>
      </div>
      <div>
        <Playlist songs={res.songs} isInProfile={false} />
      </div>
      {!!res?.songs.length && res?.total && (
        <Pagination
          page={+params.page}
          size={10}
          total={res.total}
          baseLink={"/songs"}
          params={`${
            searchParams.search ? `search=${searchParams.search}&` : ""
          }${searchParams.sortBy ? `sortBy=${searchParams.sortBy}&` : ""}`}
        />
      )}
    </div>
  );
};

export default SongsPage;
