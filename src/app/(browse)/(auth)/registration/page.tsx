import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registration } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Form } from "@/app/(browse)/(auth)/registration/_components/form";

const RegistrationPage = () => {
  // const submitHandler = async (data: FormData) => {
  //   "use server";
  //   const res = await registration(data);
  //   if (!res) return;
  //   revalidatePath("/users/[page]", "page");
  //   redirect("/login");
  // };

  return (
    <div className="flex flex-col items-center gap-3 w-[25%]">
      <h1>Registration Page</h1>
      <Form />
    </div>
  );
};

export default RegistrationPage;
