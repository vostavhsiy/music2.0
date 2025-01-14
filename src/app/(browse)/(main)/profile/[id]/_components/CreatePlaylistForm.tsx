'use client'

import { createPlaylist } from '@/actions/audio.actions'
import { Playlist } from '@/components/Player/Playlist'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getSongs } from '@/store/reducers/audio/actionCreators'
import { setPickedSongs, setSelectPage } from '@/store/reducers/audio/reducer'
import { StepBack, StepForward } from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

export const CreatePlaylistForm = () => {
	const dispatch = useAppDispatch()

	const form = useRef<HTMLFormElement>(null)
	const searchForm = useRef<HTMLFormElement>(null)

	const [file, setFile] = useState<File | null>(null)

	const [isPending, startTransition] = useTransition()

	const pickedSongs = useAppSelector(state => state.audio.pickedSongs)
	const page = useAppSelector(state => state.audio.selectPage)
	const songs = useAppSelector(state => state.audio.selectSearchSongs)
	const total = useAppSelector(state => state.audio.selectSearchSongsCount)

	const [search, setSearch] = useState('')
	const [select, setSelect] = useState(false)

	useEffect(() => {
		dispatch(getSongs({ page, search, size: 5 }))
	}, [search, page])

	const submitHandler = async (data: FormData) => {
		if (!data.get('title')) return
		data.set('songs', JSON.stringify(pickedSongs.map(s => ({ id: s }))))
		startTransition(() => {
			createPlaylist(data).then(res => {
				if (res && typeof res !== 'string') {
					toast.success('Playlist created')
					form.current?.reset()
					setFile(null)
					dispatch(setPickedSongs(null))
				} else {
					toast.error(res)
				}
			})
		})
	}

	const close = () => {
		setSelect(false)
		setSearch('')
		dispatch(setSelectPage(0))
	}

	const searchSubmitHandler = (data: FormData) => {
		dispatch(setSelectPage(0))
		setSearch(data.get('search') as string)
	}

	return (
		<>
			<form
				ref={form}
				action={submitHandler}
				className='flex flex-col gap-[20px] text-primary'
			>
				<Input name='title' placeholder='Title' />
				<Input name='image' file={file} setFile={setFile} type={'file'} />
				<Dialog
					open={select}
					onOpenChange={open => {
						if (!open) {
							close()
						}
					}}
				>
					<DialogTrigger
						asChild
						onClick={() => {
							setSelect(true)
						}}
					>
						<Button type={'button'}>Add audio to playlist</Button>
					</DialogTrigger>
					<DialogContent className='w-[80%] h-[90%] bg-secondary/90 backdrop-blur py-0 max-w-screen-lg'>
						<div className='p-3 rounded-2xl flex flex-col gap-5'>
							<form
								ref={searchForm}
								action={searchSubmitHandler}
								className='flex items-center gap-2 w-[80%]'
							>
								<Input name={'search'} placeholder={'Search'} />
								<Button type={'submit'}>Search</Button>
							</form>
							{!!songs.length ? (
								<>
									<div className='h-[75%] overflow-auto'>
										<Playlist songs={songs} inCreateMode />
									</div>
									<div className='flex items-center gap-4 justify-end'>
										<h4 className='font-semibold'>
											Page {page + 1} of {Math.ceil(total / 5)}
										</h4>
										<div className='flex items-center gap-1'>
											<Button
												disabled={page === 0}
												onClick={() => {
													if (page > 0) dispatch(setSelectPage(page - 1))
												}}
											>
												<StepBack />
											</Button>
											<Button
												disabled={page === Math.ceil(total / 5) - 1}
												onClick={() => {
													if (page < Math.ceil(total / 5) - 1)
														dispatch(setSelectPage(page + 1))
												}}
											>
												<StepForward />
											</Button>
										</div>
									</div>
								</>
							) : (
								<div className='flex items-center justify-center'>
									<h3>No results found.</h3>
								</div>
							)}
						</div>
					</DialogContent>
				</Dialog>
				<Button disabled={isPending} type='submit'>
					Create playlist
				</Button>
			</form>
		</>
	)
}
