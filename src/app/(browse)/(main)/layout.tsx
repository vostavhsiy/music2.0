import { Main } from '@/app/(browse)/_components/Main'
import { Player } from '@/components/Player/Player'
import { Sidebar } from '@/components/Sidebar'
import { currentUser } from '@/lib/services/auth.service'
import React from 'react'

const BrowseLayout = async ({ children }: { children: React.ReactNode }) => {
	const profile = await currentUser()

	return (
		<div className='grid grid-cols-[auto+1fr] mb:max-lg:block text-primary h-screen overflow-hidden'>
			<Sidebar profile={profile} />
			<Main profile={profile}>
				<div className='w-full p-10  mb:max-md:p-2 pb-0'>{children}</div>
			</Main>
			<Player />
		</div>
	)
}

export default BrowseLayout
