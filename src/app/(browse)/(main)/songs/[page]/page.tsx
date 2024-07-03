import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { Pagination } from "@/components/Pagination";
import { getSongsPage } from "@/lib/services/audio.service";
import { Song } from "@/components/Song";
import { currentUser } from "@/lib/services/auth.service";
import { Playlist } from "@/components/Player/Playlist";
import { redirect } from "next/navigation";
import { Sort } from "@/app/(browse)/(main)/_components/Sort";
import { SongSortType } from "@/lib/api/api.audio";

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
