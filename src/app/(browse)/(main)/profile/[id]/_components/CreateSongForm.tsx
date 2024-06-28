"use client";

import { Input } from "@/components/ui/input";
import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createSong } from "@/actions/audio.actions";
import { toast } from "sonner";

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
  );
};
