import { AudioApi } from "@/lib/api/api.audio";
import { NextPage } from "next";
import { PlaylistCard } from "@/app/(browse)/(main)/songs/[page]/_components/PlaylistCard";
import { Pagination } from "@/components/Pagination";

interface Props {
  params: {
    page: string;
  };
  searchParams: {
    search?: string;
    size?: string;
  };
}

const PlaylistsPage: NextPage<Props> = async ({ params, searchParams }) => {
  const { playlists, total } = await AudioApi.getPlaylists(
    +params.page - 1,
    Number(searchParams.size) || 8,
    searchParams.search,
  );

  if (!total) {
    return <></>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {playlists.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </div>
      <div>
        <Pagination
          page={+params.page}
          size={Number(searchParams.size) || 8}
          total={total}
          baseLink={"/playlists"}
        />
      </div>
    </div>
  );
};

export default PlaylistsPage;
