import { IUser } from "@/lib/types/IUser";
import { IPlaylist } from "@/lib/types/IPlaylist";
import { IListen } from "@/lib/types/IListen";
import { INotification } from "@/lib/types/INotification";

export interface ISong {
  id: string;
  userid: string;
  file: string;
  title: string;
  author: string;
  image: string;
  createdAt: string;
  person: {
    id: string;
    login: string;
    password: string;
    image: string;
    favs: string[];
  };
  usersListens: IUser[];

  // person    Person
  // playlists Playlist[]
}
