export const maxScreen = (size: string): boolean => {
	const screens: Record<string, string> = {
		xs: '480px',
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
	}

	const mediaQuery = window.matchMedia(`(max-width: ${screens[size] || size})`);
	return mediaQuery.matches;
}

export const minScreen = (size: string): boolean => {
	const screens: Record<string, string> = {
		xs: '480px',
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
	}

	const mediaQuery = window.matchMedia(`(min-width: ${screens[size] || size})`);
	return mediaQuery.matches;
}

export const isDark = (): boolean => {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}