import { Sort } from '@/app/(browse)/(main)/_components/Sort'
import { Pagination } from '@/components/Pagination'
import { Playlist } from '@/components/Player/Playlist'
import { SongSortType } from '@/lib/api/api.audio'
import { getSongsPage } from '@/lib/services/audio.service'
import { currentUser } from '@/lib/services/auth.service'
import { notFound, redirect } from 'next/navigation'

export const revalidate = 3600

const SongsPage = async ({
	params,
	searchParams,
}: {
	params: { page: string }
	searchParams: {
		size: string
		search: string
		sortBy?: SongSortType
	}
}) => {
	if (isNaN(+params.page)) notFound()

	const res = await getSongsPage(
		+params.page - 1,
		searchParams.search,
		10,
		searchParams.sortBy
	)

	const user = await currentUser()

	if (!res?.songs) redirect('/')

	return (
		<div>
			<div className={'mb-5 flex justify-end'}>
				<Sort
					items={[
						{ label: 'Listens', value: '/songs/1?sortBy=listens' },
						{ label: 'Name', value: '/songs/1?sortBy=name' },
						{ label: 'Created at (desc)', value: '/songs/1?sortBy=new' },
						{ label: 'Created at (asc)', value: '/songs/1?sortBy=old' },
					]}
					defaultValue={
						searchParams.sortBy && `/songs/1?sortBy=${searchParams.sortBy}`
					}
				/>
			</div>
			<div>
				<div
					className={
						'grid grid-cols-[50px_1fr_50%] text-primary/40 uppercase text-sm font-semibold'
					}
				>
					<div></div>
					<div>Title</div>
					<div className={'flex justify-end items-center gap-2'}>
						<div className='mr-10 mb:max-lg:hidden'>date added</div>
						<div className='w-1/2  mb:max-lg:hidden'>added by</div>
						<div className='w-[40px]'></div>
					</div>
				</div>
				<div
					className={'ml-[50px] h-[2px] bg-primary/30 rounded-xl mt-3'}
				></div>
			</div>
			{!!res?.songs.length && res?.total ? (
				<div>
					<Playlist songs={res.songs} isInProfile={false} />
				</div>
			) : (
				<>
					<p className='ml-[50px] mt-5 text-xl text-destructive'>No songs!</p>
				</>
			)}

			{!!res?.songs.length && res?.total && (
				<Pagination
					page={+params.page}
					size={10}
					total={res.total}
					baseLink={'/songs'}
					params={`${
						searchParams.search ? `search=${searchParams.search}&` : ''
					}${searchParams.sortBy ? `sortBy=${searchParams.sortBy}&` : ''}`}
				/>
			)}
		</div>
	)
}

export default SongsPage
