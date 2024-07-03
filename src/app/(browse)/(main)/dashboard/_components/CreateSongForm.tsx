"use client";

import { Input } from "@/components/ui/input";
import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createSong } from "@/actions/audio.actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const CreateSongForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const submitHandler = async (data: FormData) => {
    startTransition(() => {
      createSong(data).then((res) => {
        if (res) {
          toast.success("Song added");
          form.current?.reset();
          setFile(null);
          setImage(null);
        }
      });
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.current?.reset();
          setFile(null);
          setImage(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" size={"lg"}>
          Add new audio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new audio</DialogTitle>
          <DialogDescription>
            Describe your audio here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={form}
          action={submitHandler}
          className="flex flex-col gap-[20px] text-primary"
        >
          <Input name="title" placeholder="Title" />
          <Input name="author" placeholder="Author" />
          <Input
            name="file"
            file={file}
            setFile={setFile}
            type={"file"}
            label={"Choose audio"}
          />
          <Input name="image" file={image} setFile={setImage} type={"file"} />
          <Button disabled={isPending} type="submit">
            Add song
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
