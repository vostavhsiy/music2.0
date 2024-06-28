import { IUser } from "@/lib/types/IUser";

export interface ISong {
  id: string;
  userid: string;
  file: string;
  title: string;
  author: string;
  image: string;
  createdAt: string;

  usersListens: IUser[];

  // person    Person
  // playlists Playlist[]
}
