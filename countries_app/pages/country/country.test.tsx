import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountryPage from './[id]';
import 'jest-axe/extend-expect';
import { ThemeProvider } from '../../context/use-theme';
import { ThemeType } from '../../lib/types';
import { axe } from 'jest-axe';

const renderWithProvider = (ui: React.ReactElement, theme: ThemeType) => {
	return render(<ThemeProvider preferredTheme={theme}>{ui}</ThemeProvider>);
};

test('if country page renders correcty with correct data', () => {
	renderWithProvider(
		<CountryPage
			error={false}
			errorMessage={''}
			country={{
				name: 'Indonesia',
				flag: '/indonesiaFlag.svg',
				population: 258705000,
				region: 'Asia',
				capital: 'Jakarta',
				alpha2Code: 'ID',
				nativeName: 'Indonesia',
				topLevelDomain: '.id',
				borders: ['TLS', 'MYS', 'PNG'],
				currencies: ['Indonesian Rupiah'],
				languages: ['Indonesian'],
				subregion: 'South-Eastern Asia'
			}}
		/>,
		'dark'
	);

	expect(screen.getByTestId('country-native-name').textContent).toEqual(
		'Native Name: Indonesia'
	);
	expect(screen.getByTestId('country-population').textContent).toEqual(
		'Population: 258,705,000'
	);
	expect(screen.getByTestId('country-region').textContent).toEqual(
		'Region: Asia'
	);
	expect(screen.getByTestId('country-subregion').textContent).toEqual(
		'Sub-region: South-Eastern Asia'
	);
	expect(screen.getByTestId('country-capital').textContent).toEqual(
		'Capital: Jakarta'
	);
	expect(screen.getByTestId('country-topLevelDomain').textContent).toEqual(
		'Top Level Domain: .'
	);

	expect(screen.getByTestId('country-currencies').textContent).toEqual(
		'Currencies: '
	);

	expect(screen.getByTestId('country-languages').textContent).toEqual(
		'Languages: '
	);

	expect(screen.getByTestId('back-button')).toBeInTheDocument();

	expect(screen.getByText(/MYS/i)).toBeInTheDocument();
});

test('if country page is accessible', async () => {
	await waitFor(async () => {
		const { container } = renderWithProvider(
			<CountryPage
				error={false}
				errorMessage={''}
				country={{
					name: 'Indonesia',
					flag: '/indonesiaFlag.svg',
					population: 258705000,
					region: 'Asia',
					capital: 'Jakarta',
					alpha2Code: 'ID',
					nativeName: 'Indonesia',
					topLevelDomain: '.id',
					borders: ['TLS', 'MYS', 'PNG'],
					currencies: ['Indonesian Rupiah'],
					languages: ['Indonesian'],
					subregion: 'South-Eastern Asia'
				}}
			/>,
			'dark'
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
