'use client'

import { deletePlaylist } from '@/actions/audio.actions'
import { EditPlaylistForm } from '@/app/(browse)/(main)/dashboard/_components/EditPlaylistForm'
import { Button } from '@/components/ui/button'
import { IPlaylist } from '@/lib/types/IPlaylist'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
	playlist: IPlaylist
	isInProfile?: boolean
}

export const PlaylistCard: FC<Props> = ({ playlist, isInProfile }) => {
	const [isPending, startTransition] = useTransition()

	return (
		<div className='flex items-center justify-between'>
			<Link
				href={`/playlist/${playlist.id}`}
				className='flex items-center gap-4 hover:underline'
			>
				<div
					className={cn(
						'w-[70px] bg-gradient-to-r from-teal-400 to-yellow-200 p-[2px] aspect-square'
					)}
				>
					<Image
						src={playlist.image || '/logo.png'}
						alt={'user'}
						width={500}
						height={500}
						className={cn(
							'bg-secondary object-cover object-center w-full h-full'
						)}
					/>
				</div>
				<h3 className={'text-lg'}>{playlist.title}</h3>
			</Link>
			<div className='flex items-center gap-2'>
				{isInProfile && (
					<>
						<EditPlaylistForm playlist={playlist} />
						<Button
							disabled={isPending}
							size={'icon'}
							variant={'destructive'}
							onClick={async () => {
								startTransition(() => {
									deletePlaylist(playlist.id, playlist.image).then(res => {
										if (res && typeof res !== 'string') {
											toast.success('Playlist deleted')
										} else {
											toast.error(res)
										}
									})
								})
							}}
						>
							<Trash2 />
						</Button>{' '}
					</>
				)}
			</div>
		</div>
	)
}
