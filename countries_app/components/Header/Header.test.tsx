import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/use-theme';
import Header from './index';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';
import { ThemeType } from '../../lib/types';

const renderWithProvider = (ui: React.ReactElement, theme: ThemeType) => {
	return render(<ThemeProvider preferredTheme={theme}>{ui}</ThemeProvider>);
};

test('if Header renders correctly', () => {
	renderWithProvider(<Header />, 'dark');

	const Logo = screen.getByText(/Where in the world\?/);
	expect(Logo).toBeInTheDocument();
	expect(Logo.textContent).toEqual('Where in the world?');

	const themeButton = screen.getByTestId('themeButton');
	expect(themeButton).toBeInTheDocument();
});

test('if Theme button matches preferred theme set to dark', () => {
	renderWithProvider(<Header />, 'dark');

	const themeButton = screen.getByTestId('themeButton');
	expect(themeButton.textContent).toEqual('Dark Mode');
});

test('if Theme button matches preferred theme set to light', () => {
	renderWithProvider(<Header />, 'light');

	const themeButton = screen.getByTestId('themeButton');
	expect(themeButton.textContent).toEqual('Light Mode');
});

test('if Header if accessible', async () => {
	const { container } = renderWithProvider(<Header />, 'dark');

	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
