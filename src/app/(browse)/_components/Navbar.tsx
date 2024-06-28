import { LogoutButton } from "@/components/LogoutButton";
import { SearchInput } from "@/components/Navbar/SearchInput";
import { ProfileButton } from "@/components/ProfileButton";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/types/IUser";
import Link from "next/link";
import React from "react";
import { NavButtons } from "./NavButtons";

interface Props {
  profile: IUser | null;
}

export function Navbar({ profile }: Props) {
  return (
    <div className="w-full flex items-center justify-between py-3 px-4">
      <div className="flex items-center gap-4">
        <NavButtons />
        <SearchInput />
      </div>
      {profile ? (
        <div className="flex items-center gap-[8px] lg:gap-[15px] ">
          <LogoutButton inNavbar />
          <ProfileButton user={profile} />
        </div>
      ) : (
        <Button variant={"secondary"}>
          <Link href={"/login"}>Sign in</Link>
        </Button>
      )}
    </div>
  );
}
