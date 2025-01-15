'use client'

import { addListenToSong } from '@/actions/audio.actions'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { AudioPlayer } from '@/lib/Audio'
import convertTime from '@/lib/convertTime'
import { cn } from '@/lib/utils'
import {
	setCurrentSong,
	setCurrentTime,
	setCurrentVolume,
	setMode,
	setPause,
	setPlayer,
} from '@/store/reducers/audio/reducer'
import {
	Pause,
	Play,
	Repeat,
	StepBack,
	StepForward,
	Volume,
	Volume1,
	Volume2,
	X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useMemo, useRef, useState, useTransition } from 'react'

export const Player = () => {
	const dispatch = useAppDispatch()

	const wrapper = useRef<HTMLDivElement>(null)

	const player = useAppSelector(state => state.audio.player)
	const currentSong = useAppSelector(state => state.audio.currentSong)
	const pause = useAppSelector(state => state.audio.pause)
	const playlist = useAppSelector(state => state.audio.currentPlaylist)
	const mode = useAppSelector(state => state.audio.mode)

	const [fetching, setFetching] = useState(false)
	const [direction, setDirection] = useState<'next' | 'prev'>('next')

	const [collapse, setCollapse] = useState(true)

	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		dispatch(setPlayer(new AudioPlayer()))
	}, [])

	const handleWrapperClick = (event: MouseEvent) => {
		//@ts-ignore
		if (event.target && event.target.id === 'loop') return
		if (wrapper.current && !wrapper.current.contains(event.target as Node)) {
			setCollapse(true)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleWrapperClick)

		return () => {
			document.removeEventListener('click', handleWrapperClick)
		}
	}, [])

	const next = () => {
		if (player && playlist && currentSong) {
			setDirection('next')
			const index = playlist.findIndex(song => song.id === currentSong.id)
			//player.stop();
			if (index < playlist.length - 1) {
				return dispatch(setCurrentSong(playlist[index + 1]))
			}
			if (index === playlist.length - 1) {
				if (mode === 'linear' || mode === 'loop') return
				return dispatch(setCurrentSong(playlist[0]))
			}
		}
	}

	const prev = () => {
		if (player && playlist && currentSong) {
			setDirection('prev')
			const index = playlist.findIndex(song => song.id === currentSong.id)
			//player.stop();
			if (index > 0) {
				return dispatch(setCurrentSong(playlist[index - 1]))
			}
			if (index === 0) {
				if (mode === 'linear' || mode === 'loop') return
				return dispatch(setCurrentSong(playlist[playlist.length - 1]))
			}
		}
	}

	const isLast = useMemo(() => {
		if (currentSong && playlist) {
			const index = playlist.findIndex(song => song.id === currentSong.id)
			return index === playlist.length - 1
		}
	}, [playlist, currentSong])

	useEffect(() => {
		if (!currentSong) {
			player?.stop()
			return
		}
		if (player && currentSong) {
			setFetching(true)
			player
				.src(currentSong.file.replace('localhost', 'localhost'))
				.then(res => {
					dispatch(setPause(false))
					setFetching(false)
					player.player.ontimeupdate = () => {
						dispatch(setCurrentTime(player.player.currentTime))
					}
					startTransition(() => {
						addListenToSong(currentSong.id)
					})
				})
				.catch(() => {
					if (direction === 'next') next()
					else prev()
				})
		}
	}, [currentSong])

	useEffect(() => {
		if (player) {
			player.player.loop = mode === 'loop'
			player.player.onended = () => {
				dispatch(setPause(true))
				player.stop()
				if (playlist) {
					if (mode !== 'loop') {
						if (!isLast || mode === 'playlist') {
							next()
						}
					}
				}
			}
		}
	}, [mode, currentSong, playlist])

	if (!currentSong) return null
	if (!player) return null

	return (
		<div
			ref={wrapper}
			className={cn(
				'player fixed z-[1000] bottom-0 left-1/2 p-3 w-4/5 mb:max-lg:w-full gap-3 rounded-xl rounded-b-none -translate-x-1/2 bg-background border-[3px] backdrop-blur flex flex-col items-start justify-between animate-in duration-500',
				!collapse &&
					'w-2/5 mb:max-lg:w-4/5 aspect-square p-10 mb:max-md:px-0 bottom-1/2 translate-y-1/2 rounded-b-xl gap-5'
			)}
			onClick={() => setCollapse(false)}
		>
			<Button
				size={'xxl'}
				variant={'secondary'}
				className='absolute top-[10px] right-[10px] z-[1]'
				onClick={event => {
					event.stopPropagation()
					if (!collapse) setCollapse(true)
					else dispatch(setCurrentSong(null))
				}}
			>
				<X />
			</Button>
			<div
				className={cn(
					'relative flex items-center w-full',
					!collapse ? 'flex-col flex-1 gap-4' : 'pl-3 gap-10'
				)}
			>
				<div
					className={cn(
						'flex items-center gap-3',
						!collapse && 'w-full flex-col'
					)}
				>
					<Image
						src={currentSong.image || '/logo.png'}
						alt={'audio'}
						width={500}
						height={500}
						className={cn(
							'w-[50px] h-[50px] object-cover object-center rounded-xl',
							!collapse && 'w-[65%] h-auto aspect-square'
						)}
					/>
					<div
						className={cn(
							'flex flex-col items-start overflow-hidden',
							!collapse && 'items-center text-center'
						)}
					>
						<h4
							className={cn(
								'text-lg font-bold text-nowrap max-w-[50%]',
								!collapse && 'max-w-max'
							)}
						>
							{currentSong.title}
						</h4>
						<h5 className='text-sm font-semibold text-zinc-500 text-nowrap'>
							{currentSong.author}
						</h5>
						{!collapse && (
							<Link
								href={`/profile/${currentSong.person.id}`}
								className='block text-[.8rem] underline text-zinc-600 cursor-pointer'
							>
								{currentSong.person.login}
							</Link>
						)}
					</div>
				</div>
				<div
					className={cn(
						'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center gap-1',
						!collapse && 'static -translate-x-0 -translate-y-0',
						collapse &&
							'mb:max-md:hidden md:max-lg:left-auto md:max-lg:right-0 md:max-lg:-translate-x-1/4'
					)}
				>
					<Button
						disabled={fetching}
						onClick={async event => {
							event.stopPropagation()
							prev()
						}}
					>
						<StepBack />
					</Button>
					<Button
						variant={!pause ? 'destructive' : 'default'}
						disabled={fetching}
						onClick={async event => {
							event.stopPropagation()
							if (player.player.paused) {
								dispatch(setPause(false))
								return await player.play()
							}
							dispatch(setPause(true))
							return player.stop()
						}}
					>
						{pause ? <Play /> : <Pause />}
					</Button>
					<Button
						disabled={fetching}
						onClick={async event => {
							event.stopPropagation()
							next()
						}}
					>
						<StepForward />
					</Button>
				</div>
			</div>

			<div className='w-3/4 mb:max-md:w-full mx-auto p-3 py-0'>
				<TrackDuration collapse={collapse} player={player} />
			</div>
		</div>
	)
}

const TrackDuration: FC<{ player: AudioPlayer; collapse?: boolean }> = ({
	player,
	collapse,
}) => {
	const dispatch = useAppDispatch()

	const time = useAppSelector(state => state.audio.currentTime)
	const mode = useAppSelector(state => state.audio.mode)
	const pause = useAppSelector(state => state.audio.pause)

	return (
		<div
			className={cn('flex flex-col gap-4', !collapse && 'items-center gap-6')}
		>
			<Slider
				value={[time]}
				max={player.player.duration}
				onValueChange={([value]) => {
					dispatch(setCurrentTime(value))
					if (!player.player.paused) player.stop()
				}}
				onValueCommit={async ([value]) => {
					dispatch(setCurrentTime(value))
					player.time = value
					if (player.player.paused && !pause) await player.play()
				}}
			/>
			<div
				className={cn(
					'flex items-center gap-[40px] h-5',
					!collapse && 'w-3/4 mb:max-lg:w-full'
				)}
			>
				<div
					className={cn(
						'flex items-center gap-[40px] w-[20%] mb:max-md:w-full md:max-lg:w-1/2 h-full',
						!collapse && 'w-full mb:max-lg:w-full'
					)}
				>
					<h5 className='w-5'>{convertTime(player.player.duration - time)}</h5>
					<TrackVolume player={player} />
				</div>
				<div>
					<Button
						size='xxl'
						variant='outline'
						className='relative bg-primary-foreground text-primary'
						style={
							mode === 'playlist' || mode === 'loop'
								? {
										color: 'hsl(var(--destructive))',
								  }
								: {}
						}
						onClick={event => {
							event.stopPropagation()
							if (mode === 'linear') {
								dispatch(setMode('playlist'))
								return
							}
							if (mode === 'playlist') {
								dispatch(setMode('loop'))
								return
							}
							dispatch(setMode('linear'))
						}}
					>
						<Repeat />
						{mode === 'loop' && (
							<span
								id='loop'
								className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px]'
							>
								1
							</span>
						)}
					</Button>
				</div>
			</div>
		</div>
	)
}

const TrackVolume: FC<{ player: AudioPlayer }> = ({ player }) => {
	const dispatch = useAppDispatch()

	const volume = useAppSelector(state => state.audio.currentVolume)

	useEffect(() => {
		player.volume = volume / 100
	}, [])

	return (
		<div className='flex items-center w-[100%]'>
			<Button variant={'link'} size={'icon'}>
				{volume === 0 && <Volume />}
				{volume > 0 && volume <= 50 && <Volume1 />}
				{volume > 50 && <Volume2 />}
			</Button>
			<Slider
				value={[volume]}
				max={100}
				onValueChange={([value]) => {
					dispatch(setCurrentVolume(value))
					player.volume = value / 100
				}}
			/>
		</div>
	)
}
