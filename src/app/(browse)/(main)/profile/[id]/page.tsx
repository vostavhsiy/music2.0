import { currentUser } from "@/lib/services/auth.service";
import { UsersApi } from "@/lib/api/api.users";
import { notFound, redirect } from "next/navigation";
import { Profile } from "@/app/(browse)/(main)/profile/[id]/_components/Profile";

export const revalidate = 3600;

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  const profile = await UsersApi.getUser(params.id);
  if (!profile) notFound();

  if (user?.id === profile.id) {
    return redirect("/dashboard");
  }

  return (
    <Profile
      profile={profile}
      isAuth={!!user}
      isFollow={
        !!user?.subscribs.find(({ subscribed }) => subscribed.id === profile.id)
      }
    />
  );
};

export default ProfilePage;
