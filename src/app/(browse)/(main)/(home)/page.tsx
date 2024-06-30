import { currentUser } from "@/lib/services/auth.service";
import {
  getPopularPlaylists,
  getPopularSongs,
} from "@/lib/services/audio.service";
import { PopularSongsSlider } from "./_components/PopularSongs/PopularSongsSlider";
import { UserPlaylistsSlider } from "./_components/UserPlaylists/UsersPlaylistsSlider";
import { CurrentPlaylist } from "@/components/Navbar/CurrentPlaylist";
import { LastListens } from "@/components/Navbar/LastListens";
import { ISong } from "@/lib/types/ISong";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Contact, ListMusic, ListRestart } from "lucide-react";
import { PopularPlaylistsSlider } from "./_components/PopularPlaylists/PopularPlaylistsSlider";
import { getRecommendedUsers } from "@/lib/services/users.service";
import { PopularUsers } from "./_components/PopularUsers/PopularUsers";
import Buttons from "./_components/Buttons";

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

  const isButtons = user && !!subscribesLasts?.length;

  return (
    <div className="w-full p-4">
      <Buttons
        lasts={user?.lasts.map((last) => last.song)}
        subscribesLasts={subscribesLasts}
        isButtons={!!isButtons}
      />
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
          !user && "flex justify-center"
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
