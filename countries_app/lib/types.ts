export type ThemeType = 'light' | 'dark';

export interface IGetAllCountriesResponse {
	error: boolean;
	errorMessage: string | null;
	countries: Record<string, any>[];
}

export interface IGetCountryResponse {
	error: boolean;
	errorMessage: string | null;
	country: Record<string, any> | null;
}
