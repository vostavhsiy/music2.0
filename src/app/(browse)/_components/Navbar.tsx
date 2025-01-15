import { Notifications } from '@/app/(browse)/_components/Notifications'
import { SearchInput } from '@/components/Navbar/SearchInput'
import { ProfileButton } from '@/components/ProfileButton'
import { Button } from '@/components/ui/button'
import { IUser } from '@/lib/types/IUser'
import Link from 'next/link'
import { NavButtons } from './NavButtons'

interface Props {
	profile: IUser | null
}

export function Navbar({ profile }: Props) {
	return (
		<div className='w-full flex items-center justify-between  mb:max-md:justify-center py-3 px-4'>
			<div className='mb:max-md:hidden flex items-center gap-4'>
				<NavButtons />
				<SearchInput />
			</div>
			{profile ? (
				<div className='flex items-stretch gap-[8px] lg:gap-[15px] '>
					<div
						className={
							'flex items-center gap-3 py-1 pl-1 pr-6 bg-background rounded-3xl'
						}
					>
						<ProfileButton user={profile} />
						<Link
							className={'font-semibold hover:underline'}
							href={`/dashboard`}
						>
							{profile.login}
						</Link>
					</div>
					<Notifications notifications={profile.notifications} />
				</div>
			) : (
				<div className='flex items-center gap-5'>
					<Button asChild variant={'secondary'}>
						<a href={'/registration'}>Sign up</a>
					</Button>
					<Button asChild>
						<a href={'/login'}>Log in</a>
					</Button>
				</div>
			)}
		</div>
	)
}
