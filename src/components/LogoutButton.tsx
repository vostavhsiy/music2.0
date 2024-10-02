"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth.actions";
import { FC, useState, useTransition } from "react";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { setCurrentSong } from "@/store/reducers/audio/reducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface Props {
  inNavbar?: boolean;
}

export const LogoutButton: FC<Props> = ({ inNavbar }) => {
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const clickHandler = async () => {
    startTransition(() => {
      logout().then(() => {
        setOpen(false);
        dispatch(setCurrentSong(null));
      });
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={inNavbar ? "default" : "destructive"}
          disabled={isPending}
          size={"sm"}
        >
          <span className={"hidden lg:inline"}>Log out</span>
          <LogOut className={"lg:hidden"} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <Button variant={"destructive"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={clickHandler} disabled={isPending}>
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
