import React from "react";
import { currentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";
import { ProfileImage } from "@/app/(browse)/(main)/dashboard/_components/ProfileImage";
import { EditProfile } from "@/app/(browse)/(main)/dashboard/_components/EditProfile";
import { LogoutButton } from "@/components/LogoutButton";

const DashboardPage = async () => {
  const profile = await currentUser();

  if (!profile) redirect("/login");

  return (
    <div>
      <div className={"flex gap-10"}>
        <ProfileImage profile={profile} />
        <div className={"flex flex-col gap-8"}>
          <h2 className={"text-4xl font-semibold"}>{profile.login}</h2>
          <h3 className={"text-xl"}>
            Password: {Array(profile.password.length).fill("*").slice(0, 30)}
          </h3>
          <div
            className={
              "h-1 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500"
            }
          ></div>
          <div className="flex items-center flex-wrap gap-2">
            <h3 className={"text-xl border-r-[3px] border-primary/80 pr-4"}>
              {profile.songs.length} songs
            </h3>
            <h3 className={"text-xl border-r-[3px] border-primary/80 px-4"}>
              {profile.playlists.length} playlists
            </h3>
            <h3 className={"text-xl pl-4"}>
              {profile.subscribs.length} subscribes
            </h3>
          </div>
          <div className={"flex flex-col gap-3"}>
            <EditProfile profile={profile} />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
