import { Providers } from '@/components/providers/Providers'
import ToastContainer from '@/components/ToastContainer'
import { Toaster } from '@/components/ui/sonner'
import { currentUser } from '@/lib/services/auth.service'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.scss'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Musichub - Web Player: Music for everyone',
	description:
		'Musichub is a digital music service that gives you access to millions of songs.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const profile = await currentUser()

	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<div>{children}</div>
					{profile && <ToastContainer profile={profile} />}
					<Toaster closeButton />
				</Providers>
			</body>
		</html>
	)
}
