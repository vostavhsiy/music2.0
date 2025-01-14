'use server'

import { getAccessToken } from '@/actions/auth.actions'
import { AudioApi } from '@/lib/api/api.audio'
import { currentUser } from '@/lib/services/auth.service'
import { IPlaylist } from '@/lib/types/IPlaylist'
import { ISong } from '@/lib/types/ISong'
import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

export const deleteSong = async (id: string, imageEtc?: string) => {
	const user = await currentUser()
	const accessToken = await getAccessToken()
	if (!user || !accessToken) return false
	try {
		const res = await AudioApi.deleteSong({ id, imageEtc }, accessToken)
		if (res.message) {
			console.log(res.message)
			return res.message
		}
		revalidatePath('/', 'page')
		revalidatePath('/dashboard', 'page')
		revalidatePath('/songs/[page]', 'page')
		return res as { song: ISong; id: string }
	} catch (e) {
		const error = e as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const createSong = async (data: FormData) => {
	const user = await currentUser()
	const accessToken = await getAccessToken()
	if (!user || !accessToken) return false
	try {
		const res = await AudioApi.addSong(data, accessToken)
		if (res.message) {
			console.log(res.message)
			return res.message
		}
		revalidatePath('/dashboard', 'page')
		revalidatePath('/songs/[page]', 'page')
		return res as ISong
	} catch (e) {
		const error = e as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const createPlaylist = async (
	data:
		| {
				title: string
				songs: Array<{ id: string }>
		  }
		| FormData
) => {
	const user = await currentUser()
	const accessToken = await getAccessToken()
	if (!user || !accessToken) return false
	try {
		const res = await AudioApi.createPlaylist(data, accessToken)
		if (res.message) {
			console.log(res.message)
			return res.message
		}
		revalidatePath('/dashboard', 'page')
		revalidatePath('/playlists/[page]', 'page')
		return res as IPlaylist
	} catch (e) {
		const error = e as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const editPlaylist = async (
	id: string,
	data:
		| {
				title: string
				songs: Array<{ id: string }>
		  }
		| FormData
) => {
	const user = await currentUser()
	const accessToken = await getAccessToken()
	if (!user || !accessToken) return false
	try {
		const res = await AudioApi.editPlaylist(id, data, accessToken)
		if (res.message) {
			console.log(res.message)
			return res.message
		}
		revalidatePath('/', 'page')
		revalidatePath('/dashboard', 'page')
		revalidatePath('/playlists/[page]', 'page')
		return res as IPlaylist
	} catch (e) {
		const error = e as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const deletePlaylist = async (id: string, imageEtc: string) => {
	const user = await currentUser()
	const accessToken = await getAccessToken()
	if (!user || !accessToken) return false
	try {
		const res = await AudioApi.deletePlaylist(id, imageEtc, accessToken)
		if (res.message) {
			console.log(res.message)
			return res.message
		}
		revalidatePath('/', 'page')
		revalidatePath('/dashboard', 'page')
		revalidatePath('/playlists/[page]', 'page')
		return res
	} catch (e) {
		const error = e as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const addListenToSong = async (songId: string) => {
	const user = await currentUser()
	const accessToken = await getAccessToken()
	if (!user || !accessToken) return false
	try {
		const res = await AudioApi.addListenToSong(songId, user.id, accessToken)
		return res
	} catch (e) {
		const error = e as AxiosError
		console.log(error.response?.data + ' - listen')
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}
