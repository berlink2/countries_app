import '@reach/listbox/styles.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import RegionListbox from '../components/RegionListbox';
import IconInput from '../components/IconInput';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAllCountries } from '../api';
import { IGetAllCountriesResponse } from '../lib/types';
import CountryCard from '../components/CountryCard';

export const getServerSideProps: GetServerSideProps<IGetAllCountriesResponse> = async () => {
	const { countries, error, errorMessage } = await getAllCountries();

	return { props: { countries, error, errorMessage } };
};

export default function Home({
	countries,
	error,
	errorMessage
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [loading, setLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [filteredCountries, setFilteredCountries] = useState(countries);
	const [selectedRegion, setSelectedRegion] = useState('default');

	useEffect(() => {
		setLoading(false);
	}, []);

	useEffect(() => {
		const trimmedSearchQuery = searchQuery.trim();
		if (selectedRegion !== 'default' && trimmedSearchQuery !== '') {
			const searchedCountries = countries.filter(
				country =>
					country.name.toLowerCase().includes(trimmedSearchQuery) &&
					country.region === selectedRegion
			);
			setFilteredCountries(searchedCountries);
		} else if (trimmedSearchQuery !== '') {
			const searchedCountries = countries.filter(country =>
				country.name.toLowerCase().includes(trimmedSearchQuery)
			);
			setFilteredCountries(searchedCountries);
		} else if (selectedRegion !== 'default') {
			const countriesFilteredRegion = countries.filter(
				country => country.region === selectedRegion
			);

			setFilteredCountries(countriesFilteredRegion);
		} else if (trimmedSearchQuery === '' && selectedRegion === 'default') {
			setFilteredCountries(countries);
		}
	}, [searchQuery, selectedRegion, countries]);

	return (
		<MainWrapper>
			<Header />
			<CountriesWrapper>
				<CountriesHeader>
					<IconInput
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>

					<RegionListbox
						selectedRegion={selectedRegion}
						setSelectedRegion={setSelectedRegion}
					/>
				</CountriesHeader>
				<CountriesCardListWrapper>
					{!loading && error && <div>{errorMessage}</div>}
					{loading && 'Loading...'}
					{!loading &&
						filteredCountries.length > 0 &&
						filteredCountries.map((country, i) => {
							return <CountryCard key={country.name} country={country} i={i} />;
						})}

					{!loading && filteredCountries.length === 0 && 'No countries found.'}
				</CountriesCardListWrapper>
			</CountriesWrapper>
		</MainWrapper>
	);
}

const CountriesCardListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
	height: 100%;
	width: 100%;
	place-items: center;
	gap: 75px;
	height: inherit;
	margin-bottom: 70px;
`;

const CountriesHeader = styled.div`
	display: flex;
	flex-direction: row;
	gap: 40px;
	justify-content: space-between;
	align-items: baseline;

	@media (max-width: 450px) {
		flex-direction: column;
	}
`;

const CountriesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 45px;
	gap: 50px;

	@media (max-width: 450px) {
		padding: 30px 20px;
	}
`;

const MainWrapper = styled.div`
	max-width: 100%;
	min-height: 100%;
	background-color: var(--bg);
	font-size: var(--textFont1);

	@media (max-width: 450px) {
		max-width: var(--mobileWidth);
	}
`;
