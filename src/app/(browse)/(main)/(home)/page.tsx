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

export const revalidate = 3600;
export const dynamic = "force-static";

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

  return <div className="w-full p-4"></div>;
}
