'use client'

import { updatePaths } from '@/actions/auth.actions'
import { IUser } from '@/lib/types/IUser'
import { FC, useEffect } from 'react'
import { io } from 'socket.io-client'
import { toast } from 'sonner'

interface Props {
	profile: IUser | null
}

export const socket = io(
	process.env.NEXT_PUBLIC_API_URL + '/ws' || 'http://localhost:5001',
	{
		// path: '/server/ws',
	}
)

export const ToastContainer: FC<Props> = ({ profile }) => {
	useEffect(() => {
		socket.removeAllListeners('message')
		if (profile && socket) {
			socket.send({ type: 'connection', id: profile.id })
			socket.on('message', data => {
				const msg = JSON.parse(data)
				if (msg.type !== 'connection') {
					toast.info(msg.text)
				} else {
					console.log('Соединение установлено.')
				}
				updatePaths(['/'])
			})
		}
	}, [profile?.id])

	return null
}

export default ToastContainer
