import React from "react";
import { currentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";
import { PlaylistCard } from "@/components/PlaylistCard";
import { CreatePlaylistForm } from "@/app/(browse)/(main)/dashboard/_components/CreatePlaylistForm";

const DashboardPlaylistsPage = async () => {
  const profile = await currentUser();

  if (!profile) redirect("/login");

  return (
    <div className={"p-3"}>
      <CreatePlaylistForm />
      {!!profile.playlists.length && (
        <div className="flex flex-col gap-5 p-3">
          <h2 className={"text-xl mb-4 mt-8 font-semibold"}>
            Your{" "}
            <span
              className={
                "bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent"
              }
            >
              playlists
            </span>
          </h2>
          <div className="flex flex-col gap-5">
            {profile.playlists.map((playlist) => {
              return (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  isInProfile
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPlaylistsPage;
