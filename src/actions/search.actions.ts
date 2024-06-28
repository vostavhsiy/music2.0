"use server";

import { redirect } from "next/navigation";

export const searchSubmitHandler = async (value: string) => {
  redirect(`/search?value=${value}`);
};
