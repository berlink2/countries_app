import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../context/use-theme';
import { ThemeType } from '../../lib/types';

export default function Header() {
	const { preferredTheme, setPreferredThemeWithSideEffects } = useTheme();

	const toggleTheme = (currentTheme: ThemeType) => {
		if (currentTheme === 'dark') {
			setPreferredThemeWithSideEffects('light');
		} else {
			setPreferredThemeWithSideEffects('dark');
		}
	};

	return (
		<HeaderWrapper>
			<MainHeader id="site-header" aria-label="site-header">
				<Logo>Where in the world?</Logo>

				<ThemeButton
					data-testid="themeButton"
					onClick={() => toggleTheme(preferredTheme)}>
					<IconWrapper>
						<FontAwesomeIcon
							icon={preferredTheme === 'dark' ? faMoon : faSun}
						/>
					</IconWrapper>
					{preferredTheme === 'dark' ? 'Dark' : 'Light'} Mode
				</ThemeButton>
			</MainHeader>
		</HeaderWrapper>
	);
}

const HeaderWrapper = styled.div`
	background-color: var(--elementColor);
	width: 100%;
`;

const IconWrapper = styled.span`
	margin-right: 10px;
`;

const Logo = styled.div`
	font-size: 2.5rem;
	font-weight: var(--fontWeightBold);

	@media (max-width: 450px) {
		font-size: 1.5rem;
	}
`;

const ThemeButton = styled.button`
	background-color: inherit;
	color: var(--textColor);
	font-weight: var(--fontWeightBold);
	border: none;
	cursor: pointer;
`;

const MainHeader = styled.header`
	background-color: var(--elementColor);
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	padding: 20px 45px;

	@media (max-width: 450px) {
		padding: 45px 30px;
	}
`;
