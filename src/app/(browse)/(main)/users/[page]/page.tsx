import { Sort } from '@/app/(browse)/(main)/_components/Sort'
import { UserCard } from '@/app/(browse)/(main)/users/[page]/_components/UserCard'
import { Pagination } from '@/components/Pagination'
import { UsersSortType } from '@/lib/api/api.users'
import { currentUser } from '@/lib/services/auth.service'
import { getUsersPage } from '@/lib/services/users.service'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

const UsersPage = async ({
	params,
	searchParams,
}: {
	params: { page: string }
	searchParams: { size: string; search: string; sortBy?: UsersSortType }
}) => {
	if (isNaN(+params.page)) notFound()

	const res = await getUsersPage(
		+params.page - 1,
		searchParams.search,
		10,
		searchParams.sortBy
	)

	const profile = await currentUser()

	return (
		<div>
			<div className={'mb-5 flex justify-end'}>
				<Sort
					items={[
						{ label: 'Popular', value: '/users/1?sortBy=popular' },
						{ label: 'Name (asc)', value: '/users/1?sortBy=name-asc' },
						{ label: 'Name (desc)', value: '/users/1?sortBy=name-desc' },
					]}
					defaultValue={
						searchParams.sortBy && `/users/1?sortBy=${searchParams.sortBy}`
					}
				/>
			</div>
			<div
				className={cn(
					'grid grid-cols-[2fr_repeat(4,1fr)] text-primary/40 uppercase text-sm font-semibold mb:max-lg:flex mb:max-lg:justify-between mb:max-lg:items-center',
					!profile?.id && 'grid-cols-[2fr_repeat(3,1fr)]'
				)}
			>
				<div className='ml-4'>Login</div>
				<div className='mb:max-lg:hidden'>Subs</div>
				<div className='mb:max-lg:hidden'>Audio</div>
				<div className='mb:max-lg:hidden'>Playlists</div>
				{profile?.id && <div>Actions</div>}
			</div>
			<div className={'h-[2px] bg-primary/30 rounded-xl mt-4'}></div>
			{!!res?.users.length && res?.total ? (
				<div className='flex flex-col gap-5'>
					{res?.users.map((user, index) => {
						const isFollow = Boolean(
							profile?.subscribs.find(
								({ subscribed }) => subscribed.id === user.id
							)
						)
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
									<div className={'h-[2px] bg-primary/30 rounded-xl'}></div>
								)}
							</>
						)
					})}
				</div>
			) : (
				<>
					<p className='ml-[50px] mt-5 text-xl text-destructive'>No users!</p>
				</>
			)}

			{!!res?.users.length && res?.total && (
				<Pagination
					page={+params.page}
					size={10}
					total={res.total}
					baseLink={'/users'}
					params={`${
						searchParams.search ? `search=${searchParams.search}&` : ''
					}${searchParams.sortBy ? `sortBy=${searchParams.sortBy}&` : ''}`}
				/>
			)}
		</div>
	)
}

export default UsersPage
