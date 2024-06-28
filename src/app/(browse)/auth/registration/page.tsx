import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegistrationPage = () => {
  const submitHandler = async (data: FormData) => {
    console.log(Object.fromEntries(data));
  };

  return (
    <div>
      <form action={submitHandler}>
        <Input placeholder={"Login"} name={"login"} />
        <Input placeholder={"Password"} name={"password"} type={"password"} />
        <Input name={"image"} type={"file"} />
        <Button type={"submit"}>Sign up</Button>
      </form>
    </div>
  );
};

export default RegistrationPage;
