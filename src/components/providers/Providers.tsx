'use client'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { store } from '@/store/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
			<Provider store={store}>{children}</Provider>
		</ThemeProvider>
	)
}
