import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  page: number;
  size: number;
  total: number;
  baseLink: string;
  params?: string;
}

export const Pagination: FC<Props> = ({
  page,
  size,
  total,
  baseLink,
  params,
}) => {
  return (
    <div className="flex items-center gap-4 w-full justify-end mt-[30px]">
      <h3>
        Page {page} of {Math.ceil(total / size)}
      </h3>
      <div className="flex items-center gap-2">
        <Button disabled={page <= 1} asChild={page > 1}>
          {page <= 1 ? (
            "Back"
          ) : (
            <Link href={`${baseLink}/${page - 1}?${params}`}>Back</Link>
          )}
        </Button>
        <Button
          disabled={page >= Math.ceil(total / size)}
          asChild={page < Math.ceil(total / size)}
        >
          {page >= Math.ceil(total / size) ? (
            "Forward"
          ) : (
            <Link href={`${baseLink}/${page + 1}?${params}`}>Forward</Link>
          )}
        </Button>
      </div>
    </div>
  );
};
