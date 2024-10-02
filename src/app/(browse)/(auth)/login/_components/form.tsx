"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form as FormikForm } from "formik";
import { InputComponent } from "@/components/InputComponent";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth.actions";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setCurrentSong } from "@/store/reducers/audio/reducer";

export const Form = () => {
  const dispatch = useAppDispatch();

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
                dispatch(setCurrentSong(null));
                router.push("/");
              } else {
                toast("Error");
              }
            });
          });
        } else {
          toast.error("Fill all fields!");
        }
      }}
    >
      {({ errors, values, setFieldValue }) => (
        <FormikForm className="flex flex-col gap-[20px] w-full">
          <div className={"flex flex-col gap-3"}>
            <label
              className={"text-primary text-sm font-semibold"}
              htmlFor="login"
            >
              Login
            </label>
            <InputComponent id={"login"} name="login" placeholder={"Login"} />
          </div>
          <div className={"flex flex-col gap-3"}>
            <label
              className={"text-primary text-sm font-semibold"}
              htmlFor="password"
            >
              Password
            </label>
            <InputComponent
              id={"password"}
              name="password"
              type={"password"}
              placeholder={"Password"}
            />
          </div>

          <div className="flex items-center gap-5 w-full">
            <Switch
              checked={values.rememberMe}
              onCheckedChange={async (checked) => {
                await setFieldValue("rememberMe", checked);
              }}
              id="login-remember"
              name="rememberMe"
            />
            <label
              htmlFor="login-remember"
              className="text-sm font-semibold cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>
          <Button
            className={"bg-gradient-to-r from-teal-400 to-yellow-200"}
            disabled={isPending}
            type={"submit"}
          >
            Login
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};
