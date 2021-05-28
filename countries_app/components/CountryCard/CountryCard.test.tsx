import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import CountryCard from './index';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';

test('if Country card is accessible', async () => {
	await waitFor(async () => {
		const { container } = render(
			<CountryCard
				i={0}
				country={{
					name: 'Singapore',
					flag: '/singaporeFlag.svg',
					population: 5535000,
					region: 'Asia',
					capital: 'Singapore',
					alpha2Code: 'SG'
				}}
			/>
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

test('if country card renders correctly', async () => {
	await waitFor(async () => {
		render(
			<CountryCard
				i={0}
				country={{
					name: 'Singapore',
					flag: '/singaporeFlag.svg',
					population: 5535000,
					region: 'Asia',
					capital: 'Singapore',
					alpha2Code: 'SG'
				}}
			/>
		);

		const countryCardElement = screen.getByTestId('Singapore');
		expect(countryCardElement).toBeInTheDocument();

		const countryTitle = screen.getByTestId('countryTitle-0');
		expect(countryTitle.textContent).toEqual('Singapore');

		const countryPopulation = screen.getByTestId('countryPopulation-0');
		expect(countryPopulation.textContent).toEqual('Population: 5,535,000');

		const countryRegion = screen.getByTestId('countryRegion-0');
		expect(countryRegion.textContent).toEqual('Region: Asia');

		const countryCapital = screen.getByTestId('countryCapital-0');
		expect(countryCapital.textContent).toEqual('Capital: Singapore');

		const flagElement = screen.getByRole('img');
		expect(flagElement).toBeInTheDocument();
		expect(flagElement).toHaveAttribute('alt', 'Flag of Singapore');
	});
});
