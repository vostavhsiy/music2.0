"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth.actions";
import { FC, useTransition } from "react";
import { LogOut } from "lucide-react";

interface Props {
  inNavbar?: boolean;
}

export const LogoutButton: FC<Props> = ({ inNavbar }) => {
  const [isPending, startTransition] = useTransition();

  const clickHandler = async () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <Button
      variant={inNavbar ? "default" : "default"}
      size={"sm"}
      onClick={clickHandler}
      disabled={isPending}
    >
      <span className={"hidden lg:inline"}>Log out</span>
      <LogOut className={"lg:hidden"} />
    </Button>
  );
};
