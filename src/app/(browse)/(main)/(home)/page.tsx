import { currentUser } from "@/lib/services/auth.service";
import {
  getPopularPlaylists,
  getPopularSongs,
} from "@/lib/services/audio.service";
import { PopularSongsSlider } from "./_components/PopularSongs/PopularSongsSlider";
import { UserPlaylistsSlider } from "./_components/UserPlaylists/UsersPlaylistsSlider";
import { ISong } from "@/lib/types/ISong";
import { cn } from "@/lib/utils";
import { PopularPlaylistsSlider } from "./_components/PopularPlaylists/PopularPlaylistsSlider";
import { getRecommendedUsers } from "@/lib/services/users.service";
import { PopularUsers } from "./_components/PopularUsers/PopularUsers";
import Buttons from "./_components/Buttons";

export const revalidate = 60;

export default async function Home() {
  const user = await currentUser();

  const popularUsers = await getRecommendedUsers();
  const subscribes =
    user?.subscribs && user?.subscribs.length
      ? user.subscribs.map(({ subscribed }) => subscribed)
      : null;
  const popularSongs = await getPopularSongs();
  const popularPlaylists = await getPopularPlaylists();
  const userPlaylists =
    user?.playlists && user.playlists.length ? user.playlists : null;

  const subscribesLasts =
    user &&
    user.subscribs.reduce((acc, elem) => {
      return acc.concat([...elem.subscribed.lasts.map((last) => last.song)]);
    }, [] as ISong[]);

  const isRecentlyButton = !!user;

  return (
    <div className="w-full p-4">
      {user && (
        <Buttons
          lasts={user?.lasts.map((last) => last.song)}
          subscribesLasts={subscribesLasts}
          isRecentlyButton={isRecentlyButton}
        />
      )}
      {!!popularSongs?.length && <PopularSongsSlider songs={popularSongs} />}
      {user && userPlaylists && (
        <UserPlaylistsSlider playlists={userPlaylists} userId={user.id} />
      )}
      {!!popularPlaylists?.length && (
        <PopularPlaylistsSlider playlists={popularPlaylists} />
      )}
      <div
        className={cn(
          "my-20 grid grid-cols-1 justify-items-center gap-20",
          !user && "flex justify-center",
        )}
      >
        {popularUsers && <PopularUsers users={popularUsers} />}
        {subscribes && (
          <PopularUsers
            users={subscribes}
            title={
              <>
                Your{" "}
                <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  subscribes
                </span>
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
