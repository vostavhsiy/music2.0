import { ISong } from "@/lib/types/ISong";

export interface IListen {
  song: ISong;
  songId: string;
  createdAt: Date;
  expires: Date;
  id: string;
}
