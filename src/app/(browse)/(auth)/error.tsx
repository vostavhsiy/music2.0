"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {ErrorComponent} from "@/components/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return <ErrorComponent error={error} reset={reset} />
}
