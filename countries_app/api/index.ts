import { IGetAllCountriesResponse, IGetCountryResponse } from '../lib/types';

export const getAllCountries = async (): Promise<IGetAllCountriesResponse> => {
	try {
		const res = await fetch('https://restcountries.eu/rest/v2/all');
		if (res.ok) {
			const json = await res.json();
			return {
				error: false,
				errorMessage: null,
				countries: json
			};
		} else {
			throw new Error('Error with fetching  countries.');
		}
	} catch (error) {
		return {
			errorMessage: error.message,
			error: true,
			countries: []
		};
	}
};

export const getCountry = async (id: string): Promise<IGetCountryResponse> => {
	try {
		const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
		if (res.ok) {
			const json = await res.json();
			return {
				error: false,
				errorMessage: null,
				country: json
			};
		} else {
			throw new Error('Error with fetching that country.');
		}
	} catch (error) {
		return {
			errorMessage: error.message,
			error: true,
			country: null
		};
	}
};
