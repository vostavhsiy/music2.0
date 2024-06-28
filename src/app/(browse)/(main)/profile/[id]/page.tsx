import { currentUser } from "@/lib/services/auth.service";
import { UsersApi } from "@/lib/api/api.users";
import { redirect } from "next/navigation";
import Image from "next/image";
import { MyProfile } from "@/app/(browse)/(main)/profile/[id]/_components/MyProfile";
import { Profile } from "@/app/(browse)/(main)/profile/[id]/_components/Profile";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  const profile = await UsersApi.getUser(params.id);
  if (!profile) redirect("/users/1");

  if (user?.id !== profile.id)
    return (
      <Profile
        profile={profile}
        isAuth={!!user}
        isFollow={
          !!user?.subscribs.find(
            ({ subscribed }) => subscribed.id === profile.id,
          )
        }
      />
    );

  return <MyProfile profile={profile} />;
};

export default ProfilePage;
