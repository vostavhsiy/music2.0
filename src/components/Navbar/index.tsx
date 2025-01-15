'use client'

import { ThemeToggle } from '@/components/ThemeToggle'
import { useIsMobile } from '@/hooks/useIsMobile'
import { IUser } from '@/lib/types/IUser'
import { cn } from '@/lib/utils'
import { ListMusic, Music, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { CurrentPlaylist } from './CurrentPlaylist'
import { LastListens } from './LastListens'
import { SearchInput } from './SearchInput'

interface Props {
	user: IUser | null
	collapse?: boolean
	setCollapse: Function
}

export const Navbar: FC<Props> = ({ user, collapse, setCollapse }) => {
	const isMobile = useIsMobile()

	const handleLinkClick = () => {
		if (!isMobile) return
		setCollapse(false)
	}

	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (
				(target.tagName.toLowerCase() === 'a' ||
					target.parentElement?.tagName.toLowerCase() === 'a') &&
				isMobile
			)
				handleLinkClick()
		}
		document.addEventListener('click', clickHandler)
		return () => {
			document.removeEventListener('click', clickHandler)
		}
	})

	return (
		<header className='flex flex-col items-center lg:justify-between justify-end p-2 pt-10 sm:px-5 gap-10 mb:max-md:gap-5'>
			<div
				className={cn(
					'flex flex-col items-start mb:max-lg:items-center gap-12 w-full',
					collapse && 'items-center mb:max-md:gap-5'
				)}
			>
				<Link href={'/'} className='flex items-center gap-3'>
					<Image
						src={'/sidebar-logo.png'}
						alt={'logo'}
						width={500}
						height={500}
						className={cn(
							'w-[30px] aspect-square mb:max-lg:w-[70px] object-cover object-center transition-all',
							collapse && 'w-[40px] mb:max-lg:w-[70px]'
						)}
					/>
					<h1
						className={cn('text-2xl font-bold lg:block', collapse && '!hidden')}
					>
						{' '}
						Musichub
					</h1>
				</Link>
				<nav
					className={cn(
						'transition-all ease-out duration-1000 w-full h-full flex-col justify-center static lg:justify-start lg:bg-transparent flex items-start mb:max-lg:items-center gap-10 text-base mb:max-lg:text-3xl mb:max-md:text-xl text-primary font-semibold',
						collapse && 'items-center mb:max-md:gap-5'
					)}
				>
					<SearchInput className={'sm:hidden h-auto'} />
					<Link
						href={'/songs/1'}
						className={cn(
							'hover:text-destructive transition-all flex items-center gap-2',
							collapse && 'gap-0 mb:max-lg:gap-2'
						)}
					>
						<Music />
						<span className={cn(collapse && 'hidden mb:max-lg:block')}>
							Audio
						</span>
					</Link>
					<Link
						href={'/users/1'}
						className={cn(
							'hover:text-destructive transition-all flex items-center gap-2',
							collapse && 'gap-0 mb:max-lg:gap-2'
						)}
					>
						<Users />
						<span className={cn(collapse && 'hidden mb:max-lg:block')}>
							Community
						</span>
					</Link>
					<Link
						href={'/playlists/1'}
						className={cn(
							'hover:text-destructive transition-all flex items-center gap-2',
							collapse && 'gap-0 mb:max-lg:gap-2'
						)}
					>
						<ListMusic />
						<span className={cn(collapse && 'hidden mb:max-lg:block')}>
							Playlists
						</span>
					</Link>
				</nav>
			</div>
			<div
				className={cn(
					'w-full flex mb:max-md:flex-col md:flex-row items-center gap-[10px] lg:gap-[20px] justify-center lg:justify-between',
					collapse && '!flex-col mb:max-md:!flex-col'
				)}
			>
				<ThemeToggle collapse={!user} />
				{user && (
					<>
						<CurrentPlaylist />
						<LastListens songs={user.lasts.map(last => last.song)} />
					</>
				)}
			</div>
		</header>
	)
}
