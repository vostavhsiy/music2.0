import {
  getRecommendedUsers,
  getSubscribes,
} from "@/lib/services/users.service";
import { FC } from "react";
import { IUser } from "@/lib/types/IUser";
import { Wrapper } from "./Wrapper";

interface Props {
  profile: IUser | null;
}

export const Sidebar: FC<Props> = async ({ profile }) => {
  const recommendedUsers = await getRecommendedUsers();
  const subscribes = await getSubscribes();

  return (
    <Wrapper
      profile={profile}
      subscribes={subscribes}
      recommendedUsers={recommendedUsers}
    />
  );
};
