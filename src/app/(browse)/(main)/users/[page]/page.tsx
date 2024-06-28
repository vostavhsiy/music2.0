import { getUsersPage } from "@/lib/services/users.service";
import { currentUser } from "@/lib/services/auth.service";
import { UserCard } from "@/app/(browse)/(main)/users/[page]/_components/UserCard";
import { Pagination } from "@/components/Pagination";
import { redirect } from "next/navigation";

const UsersPage = async ({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { size: string; search: string };
}) => {
  if (isNaN(+params.page)) {
    redirect("/");
  }

  const res = await getUsersPage(+params.page - 1, searchParams.search, 10);

  const profile = await currentUser();

  return (
    <div>
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
        />
      )}
    </div>
  );
};

export default UsersPage;
