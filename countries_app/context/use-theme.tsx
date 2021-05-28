import React, {
	useState,
	useCallback,
	createContext,
	useContext,
	useMemo,
	ReactElement,
	Dispatch,
	SetStateAction
} from 'react';
import type { ThemeType } from '../lib/types';
import { setCookie, parseCookies, destroyCookie } from '../lib/cookies';
import { NextPageContext } from 'next';

interface IContextProps {
	preferredTheme: ThemeType;
	setPreferredThemeWithSideEffects: Dispatch<
		SetStateAction<ThemeType | undefined>
	>;
}

const ThemeContext = createContext<IContextProps | undefined>(undefined);

export const getThemePreference = (ctx: NextPageContext | Pick<any, 'req'>) =>
	parseCookies(ctx as Pick<any, 'req'>).theme;

interface IProviderProps {
	children: ReactElement[] | ReactElement;
	preferredTheme: ThemeType;
}

export const ThemeProvider = ({ children, ...props }: IProviderProps) => {
	const [preferredTheme, setPreferredTheme] = useState(
		() => props.preferredTheme
	);

	const setPreferredThemeWithSideEffects = useCallback(
		preference => {
			if (preference === preferredTheme) {
				return;
			}

			if (preferredTheme && preference) {
				document.body.classList.replace(preferredTheme, preference);
			} else if (preference) {
				document.body.classList.add(preference);
			} else if (preferredTheme) {
				document.body.classList.remove(preferredTheme);
			}

			if (preference) {
				setCookie(null, 'theme', preference);
			} else {
				destroyCookie(null, 'theme');
			}

			setPreferredTheme(preference);
		},
		[preferredTheme]
	);

	const memoizedContextValue = useMemo(() => {
		return {
			preferredTheme,
			setPreferredThemeWithSideEffects
		};
	}, [preferredTheme, setPreferredThemeWithSideEffects]);

	return (
		<ThemeContext.Provider value={memoizedContextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within ThemeProvider');
	}

	return context;
};

export default useTheme;
