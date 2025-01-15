import { useEffect, useState } from 'react'

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768)
		}
		checkIfMobile()

		typeof window !== 'undefined' &&
			window.addEventListener('resize', checkIfMobile)

		return () => window.removeEventListener('resize', checkIfMobile)
	}, [])

	return isMobile
}
