"use client";

import { IUser } from "@/lib/types/IUser";
import { FC, useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getBase64 } from "@/lib/getBase64";
import { cn } from "@/lib/utils";
import { editImage } from "@/actions/auth.actions";
import { toast } from "sonner";
import styles from "./../dashboard.module.scss";

interface Props {
  profile: IUser;
}

export const ProfileImage: FC<Props> = ({ profile }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const [pending, startTransition] = useTransition();

  const changeImage = () => {
    if (!image) {
      return toast.error("Choose image!");
    }
    const formData = new FormData();
    formData.append("image", image);
    startTransition(() => {
      editImage(formData).then((res) => {
        if (!res) return toast.error("Something went wrong!");
        setImageBase64(null);
        setImage(null);
        setFetching(false);
        toast.success("Image has been changed!");
      });
    });
  };

  useEffect(() => {
    if (image) {
      setFetching(true);
      getBase64(image, (result) => {
        setImageBase64(String(result));
        setFetching(false);
      });
    }
  }, [image]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setImageBase64(null);
          setImage(null);
          setFetching(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <div
          className={cn(
            styles.image,
            "w-[300px] aspect-square rounded-xl p-1 bg-gradient-to-r from-teal-400 to-yellow-200",
          )}
        >
          <Image
            src={profile.image || "/user.webp"}
            alt={"user"}
            width={500}
            height={500}
            className={
              "bg-secondary w-full h-full object-cover object-center rounded-xl"
            }
          />
          <div className={cn(styles.open, "bg-background/80")}>
            <Button size={"sm"}>Change image</Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={""}>
        {pending && (
          <div
            className={
              "absolute bg-background/80 top-0 left-0 w-full h-full flex items-center justify-center"
            }
          >
            <h2>Loading...</h2>
          </div>
        )}
        <DialogHeader>
          <DialogTitle>Change profile image</DialogTitle>
          <Button
            variant={"outline"}
            disabled={pending}
            className={"!mt-8 cursor-pointer"}
            asChild
          >
            <label htmlFor="edit-image">Upload image</label>
          </Button>
          <input
            id={"edit-image"}
            type="file"
            hidden
            onChange={(event) => {
              event.target.files && setImage(event.target.files[0]);
            }}
          />
          <div
            className={cn(
              image && "py-4",
              "w-full border border-secondary mx-auto flex items-center justify-center",
            )}
          >
            {fetching && <h2>Loading...</h2>}
            {!fetching && imageBase64 && (
              <div
                className={
                  "w-[80%] mx-auto rounded-lg p-1 bg-gradient-to-r from-teal-400 to-yellow-200"
                }
              >
                <Image
                  width={500}
                  height={500}
                  src={imageBase64}
                  alt="image"
                  className={"bg-secondary rounded-lg w-full object-contain"}
                />
              </div>
            )}
          </div>
          {image && imageBase64 && !fetching && (
            <Button disabled={pending} onClick={changeImage}>
              Change image
            </Button>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
