import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import { Form } from "@/app/(browse)/(auth)/login/_components/form";

const LoginPage = () => {
  // const submitHandler = async (data: FormData) => {
  //   "use server";
  //   const { login: name, password } = {
  //     login: data.get("login")?.toString(),
  //     password: data.get("password")?.toString(),
  //   };
  //   if (name && password) {
  //     const res = await login({ login: name, password });
  //     if (!res) return;
  //     redirect("/");
  //   }
  // };

  return (
    <div className="flex flex-col items-center gap-3 w-[25%]">
      <h1>Login Page</h1>
      <Form />
    </div>
  );
};

export default LoginPage;
