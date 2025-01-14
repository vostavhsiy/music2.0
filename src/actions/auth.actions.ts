'use server'

import { AuthApi } from '@/lib/api/api.auth'
import { IUser } from '@/lib/types/IUser'
import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const registration = async (payload: FormData) => {
	try {
		const user = await AuthApi.registration(payload)
		if (user.message) {
			console.log(user.message)
			return user.message
		}
		revalidatePath('/users/[page]', 'page')
		return user as IUser
	} catch (err) {
		const error = err as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const login = async (payload: { login: string; password: string }) => {
	try {
		const { user, accessToken, message } = await AuthApi.login(payload)

		if (message) return message

		cookies().set('accessToken', accessToken)

		return user
	} catch (err) {
		const error = err as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const edit = async (payload: { login: string; password: string }) => {
	const accessToken = await getAccessToken()
	if (!accessToken) return false
	try {
		const user = await AuthApi.edit(payload, accessToken)
		revalidatePath('/', 'page')
		revalidatePath('/dashboard', 'page')
		revalidatePath('/dashboard/audio', 'page')
		revalidatePath('/dashboard/playlists', 'page')
		revalidatePath('/dashboard/follows', 'page')
		return user
	} catch (err) {
		const error = err as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const editImage = async (payload: FormData) => {
	const accessToken = await getAccessToken()
	if (!accessToken) return false
	try {
		const user = await AuthApi.editImage(payload, accessToken)
		revalidatePath('/', 'page')
		revalidatePath('/dashboard', 'page')
		revalidatePath('/dashboard/audio', 'page')
		revalidatePath('/dashboard/playlists', 'page')
		revalidatePath('/dashboard/follows', 'page')
		return user
	} catch (err) {
		const error = err as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const logout = async () => {
	try {
		cookies().delete('accessToken')
		revalidatePath('/')
	} catch (err) {
		const error = err as AxiosError
		console.log(error.response?.data)
		//@ts-ignore
		return error.response?.data?.message || 'Something went wrong!'
	}
}

export const getAccessToken = async () => {
	const cks = cookies()
	const accessToken = await cks.get('accessToken')?.value
	if (!accessToken) return null
	return accessToken
}

export const updatePaths = async (paths: string[]) => {
	paths.forEach(path => {
		revalidatePath(path, 'page')
	})
}

export const redirectToPage = async (page: string) => {
	redirect(page)
}
