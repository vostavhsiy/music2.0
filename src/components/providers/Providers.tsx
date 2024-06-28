"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
