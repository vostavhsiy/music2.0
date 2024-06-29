import Image from "next/image";
import { auth, currentUser } from "@/lib/services/auth.service";
import { LogoutButton } from "@/components/LogoutButton";
import { getPopularSongs } from "@/lib/services/audio.service";
import { PopularSongsSlider } from "./_components/PopularSongs/PopularSongsSlider";

export default async function Home() {
  const user = await currentUser();

  const popularSongs = await getPopularSongs();

  return (
    <div className="w-full p-4">
      {popularSongs?.length && <PopularSongsSlider songs={popularSongs} />}
    </div>
  );
}
