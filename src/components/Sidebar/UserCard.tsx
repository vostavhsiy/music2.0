import { IUser } from '@/lib/types/IUser'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
	user: IUser
	collapse?: boolean
}

export const UserCard: FC<Props> = ({ user, collapse }) => {
	return (
		<Link
			href={`/profile/${user.id}`}
			className={cn(
				'mb:max-lg:max-w-fit flex items-center justify-start gap-[10px] w-full p-[2px] rounded-[5px]',
				collapse && '!justify-center'
			)}
		>
			<Image
				src={user.image || '/user.webp'}
				alt={'user'}
				width={500}
				height={500}
				className='w-[30px] aspect-square mb:max-lg:w-[80px] object-cover object-center rounded-full border'
			/>
			{!collapse && (
				<h2 className='hidden md:block mb:max-lg:text-center mb:max-lg:text-xl text-sm font-semibold text-nowrap'>
					{user.login}
				</h2>
			)}
		</Link>
	)
}
