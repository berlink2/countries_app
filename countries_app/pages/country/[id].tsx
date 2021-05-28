import { NextPageContext } from 'next';
import Header from '../../components/Header';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { getCountry } from '../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	country: Record<string, any>;
	error: boolean;
	errorMessage: string;
}

export async function getServerSideProps(context: NextPageContext) {
	const { id } = context.query;

	const { country, error, errorMessage } = await getCountry(id as string);

	return { props: { country, error, errorMessage } };
}

const CountryPage = (props: IProps) => {
	const { country, error, errorMessage } = props;

	if (!country || error) {
		return <div>{errorMessage}</div>;
	}

	const nf = new Intl.NumberFormat();

	const formatObjectsToNames = (objectArray: Record<string, any>[]) => {
		const names = objectArray.map(obj => obj.name);

		return names.join(', ');
	};

	return (
		<MainWrapper>
			<Header />
			<CountryWrapper>
				<CountryHeader>
					<BackButton data-testid="back-button">
						<div>
							<FontAwesomeIcon icon={faLongArrowAltLeft} />
						</div>
						<Link href="/">Back</Link>
					</BackButton>
				</CountryHeader>
				<CountryContent>
					<FlagWrapper>
						<Image
							alt={`Flag of ${country.name}`}
							src={country.flag}
							width={1000}
							height={750}
							loading="eager"
						/>
					</FlagWrapper>

					<Details>
						<DetailHeader>{country.name}</DetailHeader>
						<ColumnWrapper>
							<DetailColumn>
								<ul>
									<li data-testid="country-native-name">
										<span>Native Name:</span> {country.nativeName}
									</li>
									<li data-testid="country-population">
										<span>Population:</span> {nf.format(country.population)}
									</li>
									<li data-testid="country-region">
										<span>Region:</span> {country.region}
									</li>
									<li data-testid="country-subregion">
										<span>Sub-region:</span> {country.subregion}
									</li>
									<li data-testid="country-capital">
										<span>Capital:</span> {country.capital}
									</li>
								</ul>
							</DetailColumn>
							<DetailColumn>
								{' '}
								<ul>
									<li data-testid="country-topLevelDomain">
										<span>Top Level Domain:</span> {country.topLevelDomain[0]}
									</li>
									<li data-testid="country-currencies">
										<span>Currencies:</span>{' '}
										{formatObjectsToNames(country.currencies)}
									</li>
									<li data-testid="country-languages">
										<span>Languages:</span>{' '}
										{formatObjectsToNames(country.languages)}
									</li>
								</ul>
							</DetailColumn>
						</ColumnWrapper>
						<DetailFooter>
							<div>Border Countries:</div>
							<BadgeWrapper>
								{country.borders.map((border: string) => {
									return (
										<Link key={border} href={`/country/${border}`}>
											<Badge>{border}</Badge>
										</Link>
									);
								})}
							</BadgeWrapper>
						</DetailFooter>
					</Details>
				</CountryContent>
			</CountryWrapper>
		</MainWrapper>
	);
};

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 50px;
	height: 100%;
	width: 100%;
	margin-top: 35px;
	margin-bottom: 20px;

	@media (max-width: 450px) {
		flex-direction: column;
	}
`;

const DetailHeader = styled.div`
	width: 100%;
	height: fit-content;
	font-weight: var(--fontWeightBold);
	font-size: 2.5rem;
`;

const DetailColumn = styled.div`
	width: 100%;
	height: 100%;

	ul {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	span {
		font-weight: var(--fontWeightBold);
	}
`;

const DetailFooter = styled.div`
	padding-top: 25px;
	width: 100%;
	font-weight: var(--fontWeightBold);
	display: flex;
	gap: 5px;
	flex-direction: row;
	align-items: center;
	@media (max-width: 450px) {
		flex-direction: column;

		align-items: flex-start;
	}
`;

const BadgeWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	flex-wrap: wrap;
`;

const Badge = styled.div`
	font-weight: var(--fontWeightLight);
	height: fit-content;
	width: min-content;
	padding: 5px 15px;
	background: var(--elementColor);
	border-radius: 5px;
	box-shadow: var(--boxShadow1);
	cursor: pointer;
`;

const Details = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	margin-top: 20px;
`;

const FlagWrapper = styled.div`
	width: 100%;
`;

const CountryContent = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	width: 100%;
	grid-gap: 50px;
	place-items: center;
`;

const CountryHeader = styled.div`
	display: flex;
	justify-content: start;
	width: 100%;
`;

const BackButton = styled.button`
	box-shadow: var(--boxShadow1);
	border: none;
	background: var(--elementColor);
	padding: 10px 25px;
	color: var(--textColor);
	border-radius: 5px;
	display: flex;

	div {
		margin-right: 10px;
	}

	a {
		text-decoration: none;
		color: var(--textColor);
	}
`;

const CountryWrapper = styled.div`
	height: fit-content;
	width: 100%;
	background: inherit;
	display: flex;
	flex-direction: column;
	padding: 75px 45px;
	gap: 50px;
`;

const MainWrapper = styled.div`
	max-width: 100%;
	height: 100%;

	background-color: var(--bg);
	font-size: var(--textFont2);

	@media (max-width: 450px) {
		max-width: var(--mobileWidth);
	}
`;

export default CountryPage;
