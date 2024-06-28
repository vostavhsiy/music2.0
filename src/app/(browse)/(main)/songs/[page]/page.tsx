import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { Pagination } from "@/components/Pagination";
import { getSongsPage } from "@/lib/services/audio.service";
import { Song } from "@/components/Song";
import { currentUser } from "@/lib/services/auth.service";
import { Playlist } from "@/components/Player/Playlist";
import { redirect } from "next/navigation";

const SongsPage = async ({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { size: string; search: string };
}) => {
  const res = await getSongsPage(+params.page - 1, searchParams.search, 10);

  const user = await currentUser();

  if (!res?.songs) redirect("/");

  return (
    <div>
      <div>
        <Playlist songs={res.songs} isInProfile={false} />
      </div>
      {!!res?.songs.length && res?.total && (
        <Pagination
          page={+params.page}
          size={10}
          total={res.total}
          baseLink={"/songs"}
        />
      )}
    </div>
  );
};

export default SongsPage;
