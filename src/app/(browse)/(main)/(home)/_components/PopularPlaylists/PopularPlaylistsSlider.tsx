'use client'

import { Button } from '@/components/ui/button'
import { IPlaylist } from '@/lib/types/IPlaylist'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PopularPlaylist } from './PopularPlaylist'

interface Props {
	playlists: IPlaylist[]
}

export function PopularPlaylistsSlider({ playlists }: Props) {
	const sliderRef = useRef<SwiperType>()
	const nextEl = useRef<HTMLButtonElement>(null)

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return
		sliderRef.current.slideNext()
	}, [])

	return (
		<div className='mt-20'>
			<div className='mb-8 mb:max-md:mb-4 text-primary flex mb:max-md:flex-col justify-between gap-2 items-center'>
				<h2 className='text-4xl mb:max-md:text-3xl font-semibold'>
					Popular{' '}
					<span className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent'>
						playlists
					</span>
				</h2>
				<Link
					className='text-slate-300 uppercase'
					href={`/playlists/1?sortBy=popular`}
				>
					See all
				</Link>
			</div>
			<div className='flex items-stretch gap-2'>
				<Swiper
					className='w-full'
					modules={[Scrollbar]}
					scrollbar={{
						draggable: true,
						hide: true,
					}}
					spaceBetween={50}
					slidesPerView={1}
					onBeforeInit={swiper => {
						sliderRef.current = swiper
					}}
					onSlideChange={swiper => {
						if (swiper.isEnd) {
							nextEl.current?.setAttribute('disabled', 'true')
						} else {
							nextEl.current?.removeAttribute('disabled')
						}
					}}
					breakpoints={{
						1900: {
							slidesPerView: 5,
						},
						1024: {
							slidesPerView: 4,
						},
						768: {
							slidesPerView: 2,
						},
					}}
				>
					{playlists.map(playlist => {
						return (
							<SwiperSlide key={playlist.id}>
								<PopularPlaylist playlist={playlist} />
							</SwiperSlide>
						)
					})}
				</Swiper>
				<div className='w-20 flex items-center justify-center'>
					<Button
						ref={nextEl}
						className='rounded-full'
						size={'icon'}
						variant={'outline'}
						onClick={handleNext}
					>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
