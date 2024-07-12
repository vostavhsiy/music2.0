import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import { Form } from "@/app/(browse)/(auth)/login/_components/form";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

const LoginPage = () => {
  return (
    <div className="p-6 py-14 rounded-lg bg-background flex flex-col items-center gap-10 w-1/2">
      <Link href={"/"} className="flex flex-col items-center gap-8">
        <Image
          src={"/sidebar-logo.png"}
          alt={"logo"}
          width={500}
          height={500}
          className={cn(
            "w-[50px] h-[50px] object-cover object-center transition-all",
          )}
        />
        <h1 className={cn("text-3xl font-semibold")}>
          {" "}
          Login to{" "}
          <span
            className={
              "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
            }
          >
            Musichub
          </span>
        </h1>
      </Link>
      <div className="w-1/2">
        <Form />
      </div>
      <div
        className={
          "w-3/5 border-t-2 pt-10 border-foreground/10 font-semibold text-primary/50 flex justify-center gap-5"
        }
      >
        Don't have an account?{" "}
        <Link className={"text-primary underline"} href={"/registration"}>
          Sign up for Musichub.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
