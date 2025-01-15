'use client'

import { CurrentPlaylist } from '@/components/Navbar/CurrentPlaylist'
import { LastListens } from '@/components/Navbar/LastListens'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ISong } from '@/lib/types/ISong'
import { cn } from '@/lib/utils'
import { Contact, ListMusic, ListRestart } from 'lucide-react'

interface Props {
	isRecentlyButton?: boolean
	subscribesLasts: ISong[] | null
	lasts: ISong[] | undefined
}

export default function Buttons({
	isRecentlyButton,
	subscribesLasts,
	lasts,
}: Props) {
	const playlist = useAppSelector(state => state.audio.currentPlaylist)

	if (!isRecentlyButton && !subscribesLasts && !playlist) return null

	return (
		<div
			className={cn(
				'max-w-[1400px] mx-auto grid grid-cols-3  mb:max-md:grid-cols-1  mb:max-md:gap-5 items-center mb-10 gap-20 md:max-lg:gap-5 justify-center text-white',
				!isRecentlyButton && 'flex'
			)}
		>
			<CurrentPlaylist>
				<Button
					variant={'outline'}
					className={cn(
						'relative justify-start w-full h-16 rounded-[4rem] bg-gradient-to-r from-blue-600 to-violet-600',
						!isRecentlyButton && 'w-1/3'
					)}
				>
					<span className='absolute left-0 top-0 flex items-center justify-center h-full bg-white aspect-square rounded-full'>
						<ListMusic className='text-black' />
					</span>
					<span className='text-lg md:max-lg:text-base ml-16 md:max-lg:ml-14 font-semibold'>
						Current Playlist
					</span>
				</Button>
			</CurrentPlaylist>
			<>
				<LastListens songs={lasts || []}>
					<Button
						variant={'outline'}
						className={cn(
							'relative justify-start w-full h-16 rounded-[4rem] bg-gradient-to-r from-emerald-600 to-cyan-400',
							!isRecentlyButton && 'w-1/3'
						)}
					>
						<span className='absolute left-0 top-0 flex items-center justify-center h-full bg-white aspect-square rounded-full'>
							<ListRestart className='text-black' />
						</span>
						<span className='text-lg md:max-lg:text-base ml-16 md:max-lg:ml-14 font-semibold'>
							Recently played
						</span>
					</Button>
				</LastListens>
				<LastListens label={'Friends played'} songs={subscribesLasts || []}>
					<Button
						variant={'outline'}
						className={cn(
							'relative justify-start w-full h-16 rounded-[4rem] bg-gradient-to-r from-amber-500 to-pink-500',
							!isRecentlyButton && 'w-1/3'
						)}
					>
						<span className='absolute left-0 top-0 flex items-center justify-center h-full bg-white aspect-square rounded-full'>
							<Contact className='text-black' />
						</span>
						<span className='text-lg md:max-lg:text-base ml-16 md:max-lg:ml-14 font-semibold'>
							Friends played
						</span>
					</Button>
				</LastListens>
			</>
		</div>
	)
}
