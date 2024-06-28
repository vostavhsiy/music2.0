import { ISong } from "@/lib/types/ISong";
import { IUser } from "@/lib/types/IUser";

export interface IPlaylist {
  id: string;
  title: string;
  userid: string;
  image: string;
  songs: ISong[];
  author: IUser;
  // author Person
  // songs  Song[]
}
