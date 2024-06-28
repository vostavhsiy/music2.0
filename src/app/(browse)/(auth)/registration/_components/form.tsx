"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form as FormikForm } from "formik";
import { InputComponent } from "@/components/InputComponent";
import { redirect, useRouter } from "next/navigation";
import { login, registration } from "@/actions/auth.actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";

export const Form = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const submitHandler = async (data: FormData) => {
    startTransition(() => {
      registration(data).then((res) => {
        if (res) {
          toast.success("You sign up successfully!");
          setFile(null);
          router.push("/login");
        } else {
          toast.error("Error");
        }
      });
    });
  };

  return (
    <form action={submitHandler} className="flex flex-col gap-[20px] w-full">
      <Input placeholder={"Login"} name={"login"} />
      <Input placeholder={"Password"} name={"password"} type={"password"} />
      <Input name={"image"} file={file} setFile={setFile} type={"file"} />
      <Button type={"submit"}>Sign up</Button>
    </form>
  );
};
