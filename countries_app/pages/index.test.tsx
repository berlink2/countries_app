import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Index from './index';
import 'jest-axe/extend-expect';
import { ThemeProvider } from '../context/use-theme';
import { ThemeType } from '../lib/types';
import { axe } from 'jest-axe';
import user from '@testing-library/user-event';

const renderWithProvider = (ui: React.ReactElement, theme: ThemeType) => {
	return render(<ThemeProvider preferredTheme={theme}>{ui}</ThemeProvider>);
};

test('if home page renders correctly with correct data', () => {
	renderWithProvider(
		<Index
			error={false}
			errorMessage={null}
			countries={[
				{
					name: 'Singapore',
					flag: '/singaporeFlag.svg',
					population: 5535000,
					region: 'Asia',
					capital: 'Singapore',
					alpha2Code: 'SG'
				},
				{
					name: 'Indonesia',
					flag: '/indonesiaFlag.svg',
					population: 258705000,
					region: 'Asia',
					capital: 'Jakarta',
					alpha2Code: 'ID'
				}
			]}
		/>,
		'dark'
	);

	// singapore card should exist in dom
	const singaporeCard = screen.getByTestId(/Singapore/);
	expect(singaporeCard).toBeInTheDocument();

	// indonesia card should exist in dom
	const indonesiaCard = screen.getByTestId(/Indonesia/);
	expect(indonesiaCard).toBeInTheDocument();

	// input component is rendered and has default values
	const countryInput = screen.getByTestId(/country-search/);
	expect(countryInput).toBeInTheDocument();
	expect(countryInput).toHaveAttribute(
		'placeholder',
		'Search for a country...'
	);
	expect(countryInput).toHaveValue('');

	// region listbox is rendered and has default values
	const regionListbox = screen.getByTestId(/region-listbox/);
	expect(regionListbox).toBeInTheDocument();
	expect(regionListbox).toHaveAttribute('data-value', 'default');
	expect(regionListbox).toHaveAttribute('data-state', 'closed');
	expect(regionListbox.textContent).toEqual('Filter By Region▼');
});

test('if home page renders correctly with  error', () => {
	renderWithProvider(
		<Index error={true} errorMessage={'No countries found.'} countries={[]} />,
		'dark'
	);

	// singapore card should exist in dom
	const singaporeCard = screen.queryByTestId(/Singapore/);
	expect(singaporeCard).toBeNull();

	// indonesia card should exist in dom
	const indonesiaCard = screen.queryByTestId(/Indonesia/);
	expect(indonesiaCard).toBeNull();

	// input component is rendered and has default values
	const countryInput = screen.getByTestId(/country-search/);
	expect(countryInput).toBeInTheDocument();
	expect(countryInput).toHaveAttribute(
		'placeholder',
		'Search for a country...'
	);
	expect(countryInput).toHaveValue('');

	// region listbox is rendered and has default values
	const regionListbox = screen.getByTestId(/region-listbox/);
	expect(regionListbox).toBeInTheDocument();
	expect(regionListbox).toHaveAttribute('data-value', 'default');
	expect(regionListbox).toHaveAttribute('data-state', 'closed');
	expect(regionListbox.textContent).toEqual('Filter By Region▼');

	expect(screen.getAllByText(/No countries found./i).length).toBeGreaterThan(0);
});

const countriesComponent = (
	<Index
		error={false}
		errorMessage={null}
		countries={[
			{
				name: 'Singapore',
				flag: '/singaporeFlag.svg',
				population: 5535000,
				region: 'Asia',
				capital: 'Singapore',
				alpha2Code: 'SG'
			},
			{
				name: 'Indonesia',
				flag: '/indonesiaFlag.svg',
				population: 258705000,
				region: 'Asia',
				capital: 'Jakarta',
				alpha2Code: 'ID'
			},
			{
				name: 'United States of America',
				flag: '/indonesiaFlag.svg',
				population: 323947000,
				region: 'Americas',
				capital: 'Washington, D.C.',
				alpha2Code: 'US'
			},
			{
				name: 'United Kingdom',
				flag: '/indonesiaFlag.svg',
				population: 65110000,
				region: 'Europe',
				capital: 'London',
				alpha2Code: 'GB'
			}
		]}
	/>
);

test('if region filter works', () => {
	renderWithProvider(countriesComponent, 'dark');

	// singapore card should exist in dom
	const singaporeCard = screen.getByTestId(/Singapore/);
	expect(singaporeCard).toBeInTheDocument();

	// indonesia card should exist in dom
	const indonesiaCard = screen.getByTestId(/Indonesia/);
	expect(indonesiaCard).toBeInTheDocument();

	// usa card should exist in dom
	const usCard = screen.getByTestId(/United States of America/);
	expect(usCard).toBeInTheDocument();

	const ukCard = screen.getByTestId(/United Kingdom/);
	expect(ukCard).toBeInTheDocument();

	// select asia region so us card should not be in dom
	// const regionListboxButton = screen.getByTestId(/region-listbox/);
	// user.click(regionListboxButton);
	const regionListboxButton = screen.getByRole('button', {
		name: 'Filter By Region Filter By Region'
	});
	user.click(regionListboxButton);

	const asiaOption = screen.getByTestId('list-option-asia');
	user.click(asiaOption);

	// usa card should not exist in dom
	const usCardAfterFilter = screen.queryByTestId(/United States of America/);
	expect(usCardAfterFilter).toBeNull();

	const ukCardAfterFilter = screen.queryByTestId(/United Kingdom/);
	expect(ukCardAfterFilter).toBeNull();
});

test('if search input works', () => {
	renderWithProvider(countriesComponent, 'dark');

	// singapore card should exist in dom
	const singaporeCard = screen.getByTestId(/Singapore/);
	expect(singaporeCard).toBeInTheDocument();

	// indonesia card should exist in dom
	const indonesiaCard = screen.getByTestId(/Indonesia/);
	expect(indonesiaCard).toBeInTheDocument();

	// usa card should exist in dom
	const usCard = screen.getByTestId(/United States of America/);
	expect(usCard).toBeInTheDocument();

	const ukCard = screen.getByTestId(/United Kingdom/);
	expect(ukCard).toBeInTheDocument();

	let usCardAfterSearch;

	// singapore and indonesia contain "in" so they should stil be in dom
	const search = screen.getByTestId('country-search');
	user.type(search, 'in');

	expect(singaporeCard).toBeInTheDocument();
	expect(indonesiaCard).toBeInTheDocument();
	expect(ukCard).toBeInTheDocument();
	usCardAfterSearch = screen.queryByTestId(/United States of America/);
	expect(usCardAfterSearch).toBeNull();

	//ind only exists in indonesia so only indonesia will be in the dom
	user.clear(search);
	user.type(search, 'ind');
	expect(indonesiaCard).toBeInTheDocument();

	usCardAfterSearch = screen.queryByTestId(/United States of America/);
	expect(usCardAfterSearch).toBeNull();

	const singaporeCardAfterSearch = screen.queryByTestId(/Singapore/);
	expect(singaporeCardAfterSearch).toBeNull();

	const ukAfterSearch = screen.queryByTestId(/United Kingdom/);
	expect(ukAfterSearch).toBeNull();
});

test('if search and region filter work together', () => {
	renderWithProvider(countriesComponent, 'dark');

	// singapore card should exist in dom
	const singaporeCard = screen.getByTestId(/Singapore/);
	expect(singaporeCard).toBeInTheDocument();

	// indonesia card should exist in dom
	const indonesiaCard = screen.getByTestId(/Indonesia/);
	expect(indonesiaCard).toBeInTheDocument();

	// usa card should exist in dom
	const usCard = screen.getByTestId(/United States of America/);
	expect(usCard).toBeInTheDocument();

	const ukCard = screen.getByTestId(/United Kingdom/);
	expect(ukCard).toBeInTheDocument();

	// us and uk contain "united" so they should stil be in dom
	const search = screen.getByTestId('country-search');
	user.type(search, 'united');
	expect(ukCard).toBeInTheDocument();
	expect(usCard).toBeInTheDocument();

	const inaAfterSearch = screen.queryByTestId(/Indonesia/);
	expect(inaAfterSearch).toBeNull();

	const singaporeCardAfterSearch = screen.queryByTestId(/Singapore/);
	expect(singaporeCardAfterSearch).toBeNull();

	const regionListboxButton = screen.getByRole('button', {
		name: 'Filter By Region Filter By Region'
	});

	user.click(regionListboxButton);

	const europeOption = screen.getByTestId('list-option-europe');
	user.click(europeOption);

	// usa card should not exist in dom
	const usCardAfterFilter = screen.queryByTestId(/United States of America/);
	expect(usCardAfterFilter).toBeNull();

	const ukCardAfterFilter = screen.getByText(/United Kingdom/i);
	expect(ukCardAfterFilter).toBeInTheDocument();
});

test('if homepage is accessible', async () => {
	await waitFor(async () => {
		const { container } = renderWithProvider(countriesComponent, 'dark');

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
