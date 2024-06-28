import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const submitHandler = async (data: FormData) => {
    console.log(Object.fromEntries(data));
  };

  return (
    <div>
      <form action={submitHandler}>
        <Input placeholder={"Login"} name={"login"} />
        <Input placeholder={"Password"} name={"password"} type={"password"} />
        <Button type={"submit"}>Sign in</Button>
      </form>
    </div>
  );
};

export default LoginPage;
