import { IUser } from "@/lib/types/IUser";

export interface INotification {
  id: string;
  userId: string;
  person: IUser;
  expires: Date;
  text: string;
  link?: string;
}
