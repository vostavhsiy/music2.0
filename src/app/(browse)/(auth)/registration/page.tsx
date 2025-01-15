import { Form } from '@/app/(browse)/(auth)/registration/_components/form'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const RegistrationPage = () => {
	return (
		<div className='p-6 mb:max-md:px-2 py-14 rounded-lg bg-background flex flex-col items-center gap-10 w-1/2 mb:max-lg:w-full'>
			<Link href={'/'} className='flex flex-col items-center gap-8'>
				<Image
					src={'/sidebar-logo.png'}
					alt={'logo'}
					width={500}
					height={500}
					className={cn(
						'w-[50px] h-[50px] object-cover object-center transition-all'
					)}
				/>
				<h1 className={cn('text-center text-3xl font-semibold')}>
					{' '}
					Sign up and immerse
					<br /> yourself in{' '}
					<span
						className={
							'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'
						}
					>
						music
					</span>
				</h1>
			</Link>
			<div className='w-1/2 mb:max-md:w-full'>
				<Form />
			</div>
			<div
				className={
					'border-t-2 pt-10 border-foreground/10 font-semibold text-primary/50 flex mb:max-md:flex-col mb:max-md:items-center mb:max-md:text-center justify-center gap-5 mb:max-md:w-full'
				}
			>
				Already have an account?{' '}
				<Link className={'text-primary underline'} href={'/login'}>
					Sign in.
				</Link>
			</div>
		</div>
	)
}

export default RegistrationPage
