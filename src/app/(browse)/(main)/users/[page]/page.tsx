import { getUsersPage } from "@/lib/services/users.service";
import { currentUser } from "@/lib/services/auth.service";
import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { Pagination } from "@/components/Pagination";
import { redirect } from "next/navigation";
import { Sort } from "@/app/(browse)/(main)/_components/Sort";
import { UsersSortType } from "@/lib/api/api.users";

const UsersPage = async ({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { size: string; search: string; sortBy?: UsersSortType };
}) => {
  if (isNaN(+params.page)) {
    redirect("/");
  }

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
      <div className="grid grid-cols-5 gap-5">
        {res?.users.map((user) => {
          const isFollow = Boolean(
            profile?.subscribs.find(
              ({ subscribed }) => subscribed.id === user.id,
            ),
          );
          return (
            <UserCard
              key={user.id}
              user={user}
              isAuth={profile?.id}
              isFollow={isFollow}
              currentPage={+params.page}
            />
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
