import React from "react";
import { currentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";
import { Playlist } from "@/components/Player/Playlist";
import { CreateSongForm } from "@/app/(browse)/(main)/dashboard/_components/CreateSongForm";

const DashboardAudioPage = async () => {
  const profile = await currentUser();

  if (!profile) redirect("/login");

  return (
    <div className={"p-3"}>
      <CreateSongForm />
      <h2 className={"text-xl mb-4 mt-8 font-semibold"}>
        Your{" "}
        <span
          className={
            "bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent"
          }
        >
          audio
        </span>
      </h2>
      {!!profile.songs.length ? (
        <Playlist songs={profile.songs} isInProfile />
      ) : (
        <h2>No songs!</h2>
      )}
    </div>
  );
};

export default DashboardAudioPage;
