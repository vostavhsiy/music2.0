import { getUsersPage } from "@/lib/services/users.service";
import { currentUser } from "@/lib/services/auth.service";
import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { Pagination } from "@/components/Pagination";
import { notFound, redirect } from "next/navigation";
import { Sort } from "@/app/(browse)/(main)/_components/Sort";
import { UsersSortType } from "@/lib/api/api.users";
import { cn } from "@/lib/utils";
import React from "react";

const UsersPage = async ({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { size: string; search: string; sortBy?: UsersSortType };
}) => {
  if (isNaN(+params.page)) notFound();

  const res = await getUsersPage(
    +params.page - 1,
    searchParams.search,
    10,
    searchParams.sortBy,
  );

  const profile = await currentUser();

  return (
    <div>
      <div className={"mb-5 flex justify-end"}>
        <Sort
          items={[
            { label: "Popular", value: "/users/1?sortBy=popular" },
            { label: "Name (asc)", value: "/users/1?sortBy=name-asc" },
            { label: "Name (desc)", value: "/users/1?sortBy=name-desc" },
          ]}
          defaultValue={
            searchParams.sortBy && `/users/1?sortBy=${searchParams.sortBy}`
          }
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-[2fr_repeat(4,1fr)] text-primary/40 uppercase text-sm font-semibold",
          !profile?.id && "grid-cols-[2fr_repeat(3,1fr)]",
        )}
      >
        <div className="ml-4">Login</div>
        <div>Subs</div>
        <div>Audio</div>
        <div>Playlists</div>
        {profile?.id && <div>Actions</div>}
      </div>
      <div className={"h-[2px] bg-primary/30 rounded-xl mt-4"}></div>
      <div className="flex flex-col gap-5">
        {res?.users.map((user, index) => {
          const isFollow = Boolean(
            profile?.subscribs.find(
              ({ subscribed }) => subscribed.id === user.id,
            ),
          );
          return (
            <>
              <UserCard
                key={user.id}
                user={user}
                isAuth={profile?.id}
                isFollow={isFollow}
                currentPage={+params.page}
              />
              {index < res?.users.length - 1 && (
                <div className={"h-[2px] bg-primary/30 rounded-xl"}></div>
              )}
            </>
          );
        })}
      </div>
      {!!res?.users.length && res?.total && (
        <Pagination
          page={+params.page}
          size={10}
          total={res.total}
          baseLink={"/users"}
          params={`${
            searchParams.search ? `search=${searchParams.search}&` : ""
          }${searchParams.sortBy ? `sortBy=${searchParams.sortBy}&` : ""}`}
        />
      )}
    </div>
  );
};

export default UsersPage;
