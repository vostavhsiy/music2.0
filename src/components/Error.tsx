"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"h-screen flex flex-col gap-8 items-center justify-center"}>
      <Link href={"/"}>
        <Image
          src={"/sidebar-logo.png"}
          alt={"logo"}
          width={500}
          height={500}
          className={cn(
            "w-[60px] aspect-square object-cover object-center transition-all",
          )}
        />
      </Link>
      <h2 className={"font-semibold text-lg"}>Something went wrong!</h2>
      <Button size={"lg"} onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};
