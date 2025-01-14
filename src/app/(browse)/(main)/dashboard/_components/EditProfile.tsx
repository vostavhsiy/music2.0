'use client'

import { edit } from '@/actions/auth.actions'
import { InputComponent } from '@/components/InputComponent'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { IUser } from '@/lib/types/IUser'
import { Formik, Form as FormikForm } from 'formik'
import { FC, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
	profile: IUser
}

export const EditProfile: FC<Props> = ({ profile }) => {
	const [isPending, startTransition] = useTransition()

	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={value => setOpen(value)}>
			<DialogTrigger asChild>
				<Button variant='outline'>Edit Profile</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<Formik
					initialValues={{
						login: profile.login,
						password: '',
					}}
					onSubmit={(values, { setFieldError }) => {
						if (values.login) {
							startTransition(() => {
								edit(values).then(res => {
									if (!res || typeof res === 'string') {
										return toast.error(
											typeof res === 'string' ? res : 'Something went wrong!'
										)
									}
									setOpen(false)
									toast.success('Profile is changed!')
								})
							})
						} else {
							toast.error('Fill something!')
						}
					}}
				>
					{({ errors }) => (
						<FormikForm className='flex flex-col gap-[20px] w-full'>
							<InputComponent name='login' placeholder={'Login'} />
							<InputComponent
								name='password'
								type={'password'}
								placeholder={'Password'}
							/>

							{errors.password && (
								<h3 className='text-center text-red-500 text-lg font-bold'>
									{errors.password}
								</h3>
							)}
							<Button disabled={isPending} type='submit'>
								Save changes
							</Button>
						</FormikForm>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}
