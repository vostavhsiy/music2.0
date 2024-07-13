import React from "react";
import { cn } from "@/lib/utils";
import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { currentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";

const DashboardAudioPage = async () => {
  const profile = await currentUser();

  if (!profile) redirect("/login");

  return (
    <div className="p-6">
      <h2 className={"text-xl mb-8 font-semibold"}>
        Your{" "}
        <span
          className={
            "bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent"
          }
        >
          subscribes
        </span>
      </h2>
      <div
        className={cn(
          "grid grid-cols-[2fr_repeat(3,1fr)] text-primary/40 uppercase text-sm font-semibold",
        )}
      >
        <div className="ml-4">Login</div>
        <div>Audio</div>
        <div>Playlists</div>
        {profile?.id && <div>Actions</div>}
      </div>
      <div className={"h-[2px] bg-primary/30 rounded-xl mt-4"}></div>
      {!!profile.subscribs.length ? (
        <div className="flex flex-col gap-5">
          {profile.subscribs.map(({ subscribed: user }, index) => {
            return (
              <>
                <UserCard
                  key={user.id}
                  user={user}
                  isAuth={profile?.id}
                  isFollow
                />
                {index < profile.subscribs.length - 1 && (
                  <div className={"h-[2px] bg-primary/30 rounded-xl"}></div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <h2 className={"mt-4"}>No follows!</h2>
      )}
    </div>
  );
};

export default DashboardAudioPage;
