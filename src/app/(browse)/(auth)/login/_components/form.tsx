"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form as FormikForm } from "formik";
import { InputComponent } from "@/components/InputComponent";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth.actions";
import { toast } from "sonner";

export const Form = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
        rememberMe: false,
      }}
      onSubmit={(values, { setFieldError }) => {
        if (values.login && values.password) {
          startTransition(() => {
            login(values).then((res) => {
              if (res) {
                toast("You logged in");
                router.push("/");
              } else {
                toast("Error");
              }
            });
          });
        } else {
          setFieldError("password", "Fill all fields");
        }
      }}
    >
      {({ errors }) => (
        <FormikForm className="flex flex-col gap-[20px] w-full">
          <InputComponent name="login" placeholder={"Login"} />
          <InputComponent
            name="password"
            type={"password"}
            placeholder={"Password"}
          />
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="login-remember"
              className="text-base font-semibold cursor-pointer select-none"
            >
              Remember me
            </label>
            <InputComponent
              id="login-remember"
              type={"checkbox"}
              name="rememberMe"
              placeholder={"Login"}
              className="w-[6%]"
            />
          </div>

          {errors.password && (
            <h3 className="text-center text-red-500 text-lg font-bold">
              {errors.password}
            </h3>
          )}
          <Button disabled={isPending} type={"submit"}>
            Login
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};
