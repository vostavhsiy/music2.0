'use client'

import { useAppSelector } from '@/hooks/useAppSelector'
import { IUser } from '@/lib/types/IUser'
import { cn } from '@/lib/utils'
import { ChevronsLeft, ChevronsRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Navbar } from '../Navbar'
import { Button } from '../ui/button'
import { UserCard } from './UserCard'
interface Props {
	recommendedUsers: IUser[] | null
	subscribes: IUser[] | null
	profile: IUser | null
}

export function Wrapper({ recommendedUsers, subscribes, profile }: Props) {
	const [collapse, setCollapse] = useState(false)

	const currentSong = useAppSelector(state => state.audio.currentSong)

	return (
		<div
			className={cn(
				'relative flex flex-col gap-6 h-full border-r-[1px] border-b-border w-[250px] transition-all mb:max-lg:fixed mb:max-lg:top-0 mb:max-lg:left-0 mb:max-lg:w-full mb:max-lg:h-full mb:max-lg:justify-center mb:max-lg:bg-background mb:max-lg:z-[2]',
				collapse && 'w-[100px]',
				!collapse && 'mb:max-lg:w-full mb:max-lg:-left-full'
			)}
		>
			<Button
				onClick={() => setCollapse(prev => !prev)}
				size={'icon'}
				variant={'ghost'}
				className={cn(
					'absolute right-3 bottom-3 bg-background mb:max-lg:rounded-full',
					collapse && 'right-1/2 translate-x-1/2',
					!collapse &&
						'mb:max-lg:left-auto mb:max-lg:-right-[3%] mb:max-md:-right-[7%] mb:max-lg:top-[0rem] mb:max-lg:rounded-tl-none',
					collapse && 'mb:max-lg:!right-6 mb:max-lg:!bottom-3',
					currentSong && !collapse && 'right-auto left-3'
				)}
			>
				{collapse ? (
					<ChevronsRight className='mb:max-lg:hidden' />
				) : (
					<ChevronsLeft className='mb:max-lg:hidden' />
				)}
				{!collapse ? (
					<Menu className='mb:max-lg:block hidden' />
				) : (
					<X className='mb:max-lg:block hidden' />
				)}
			</Button>
			<Navbar user={profile} collapse={collapse} setCollapse={setCollapse} />
			{(!profile || (profile && !collapse)) && (
				<div className='flex flex-col items-center gap-2 transition-all mb:max-lg:hidden'>
					{!!recommendedUsers?.length && (
						<div className='flex flex-col gap-4 w-full p-4 pt-0 pb-0 mb-0'>
							<h2
								className={cn(
									'hidden md:block mb:max-lg:text-center mb:max-lg:text-2xl text-sm text-zinc-400 font-semibold',
									collapse && 'text-center'
								)}
							>
								{collapse ? 'Recs' : 'Recommended'}
							</h2>
							<h2 className='md:hidden text-sm text-zinc-400 font-semibold'>
								Recs
							</h2>
							<div className='mb:max-lg:max-w-fit mb:max-lg:mx-auto flex flex-col mb:max-lg:items-stretch gap-[15px] w-full animate-in'>
								{recommendedUsers.map(user => {
									return (
										<UserCard key={user.id} user={user} collapse={collapse} />
									)
								})}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
