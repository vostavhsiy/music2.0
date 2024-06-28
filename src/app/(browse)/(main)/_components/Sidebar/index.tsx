import {
  getRecommendedUsers,
  getSubscribes,
} from "@/lib/services/users.service";
import { UserCard } from "@/app/(browse)/(main)/_components/Sidebar/UserCard";

export const Sidebar = async () => {
  const recommendedUsers = await getRecommendedUsers();
  const subscribes = await getSubscribes();

  return (
    <div className="flex flex-col items-center gap-2 w-[70px] lg:w-[250px] transition-all border-r-[1px] border-b-border">
      {recommendedUsers && (
        <div className="flex flex-col gap-4 w-full p-4 mt-4 pb-0 mb-0">
          <h2 className="hidden lg:block text-sm text-zinc-400 font-semibold">
            Recommended
          </h2>
          <h2 className="lg:hidden text-sm text-zinc-400 font-semibold">
            Recs
          </h2>
          <div className="flex flex-col gap-[15px] w-full animate-in">
            {recommendedUsers.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })}
          </div>
        </div>
      )}
      {subscribes && !!subscribes.length && (
        <div className="flex flex-col gap-4 w-full p-4 mt-4 pb-0 mb-0">
          <h2 className="hidden lg:block text-sm text-zinc-400 font-semibold">
            Subscribes
          </h2>
          <h2 className="lg:hidden text-sm text-zinc-400 font-semibold">
            Subs
          </h2>
          <div className="flex flex-col gap-[15px] w-full animate-in">
            {subscribes.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
