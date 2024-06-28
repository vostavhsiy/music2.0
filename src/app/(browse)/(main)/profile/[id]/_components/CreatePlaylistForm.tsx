"use client";

import { Input } from "@/components/ui/input";
import { useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createSong } from "@/actions/audio.actions";
import { toast } from "sonner";

export const CreateSongForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();

  const submitHandler = async (data: FormData) => {
    startTransition(() => {
      createSong(data).then((res) => {
        if (res) {
          toast.success("Song added");
          form.current?.reset();
        }
      });
    });
  };

  return (
    <form
      ref={form}
      action={submitHandler}
      className="flex flex-col gap-[20px] text-black"
    >
      <Input name="title" placeholder="Title" />
      <Input name="author" placeholder="Author" />
      <Input name="file" type={"file"} />
      <Input name="image" type={"file"} />
      <Button disabled={isPending} type="submit">
        Add song
      </Button>
    </form>
  );
};
