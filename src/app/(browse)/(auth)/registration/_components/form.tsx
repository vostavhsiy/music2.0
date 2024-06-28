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
        <FormikForm>
          <InputComponent name="login" placeholder={"Login"} />
          <InputComponent name="password" placeholder={"Password"} />
          <InputComponent
            type={"checkbox"}
            name="rememberMe"
            placeholder={"Login"}
          />
          {errors.password && <h3>{errors.password}</h3>}
          <Button disabled={isPending} type={"submit"}>
            Login
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};
