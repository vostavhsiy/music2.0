'use client'

import { createSong } from '@/actions/audio.actions'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

export const CreateSongForm = () => {
	const form = useRef<HTMLFormElement>(null)
	const [file, setFile] = useState<File | null>(null)
	const [image, setImage] = useState<File | null>(null)

	const [isPending, startTransition] = useTransition()

	const submitHandler = async (data: FormData) => {
		if (!file || !data.get('title') || !data.get('author')) {
			toast.error('Fill all fields!')
			return
		}
		if (data.get('title')!.toString().length > 30) {
			toast.error('Title must be under 30 symbols!')
			return
		}
		if (data.get('author')!.toString().length > 30) {
			toast.error("Author's name must be under 30 symbols!")
			return
		}
		startTransition(() => {
			createSong(data).then(res => {
				if (res && typeof res !== 'string') {
					toast.success('Song added')
					form.current?.reset()
					setFile(null)
					setImage(null)
				} else {
					toast.error(res || "Error! Try again.")
				}
			})
		})
	}

	return (
		<Dialog
			onOpenChange={open => {
				if (!open) {
					form.current?.reset()
					setFile(null)
					setImage(null)
				}
			}}
		>
			<DialogTrigger asChild>
				<Button variant='default' size={'lg'}>
					Add new audio
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add new audio</DialogTitle>
					<DialogDescription>
						Describe your audio here. Click add when you're done.
					</DialogDescription>
				</DialogHeader>
				<form
					ref={form}
					action={submitHandler}
					className='flex flex-col gap-[20px] text-primary'
				>
					<Input name='title' placeholder='Title' />
					<Input name='author' placeholder='Author' />
					<Input
						name='file'
						file={file}
						setFile={setFile}
						type={'file'}
						label={'Choose audio'}
					/>
					<Input name='image' file={image} setFile={setImage} type={'file'} />
					<Button disabled={isPending} type='submit'>
						Add song
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
