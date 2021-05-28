import styled from 'styled-components';
import { useRouter } from 'next/router';

interface IProps {
	country: Record<string, any>;
	i: number;
}

const CountryCard = ({ country, i }: IProps) => {
	const nf = new Intl.NumberFormat();
	const router = useRouter();
	return (
		<CountryCardWrapper
			onClick={() => {
				router.push({
					pathname: `/country/[id]`,
					query: {
						id: country.alpha2Code
					}
				});
			}}
			data-testid={country.name}
			tabIndex={0}
			key={country.name}>
			<FlagWrapper>
				<img
					src={country.flag}
					alt={`Flag of ${country.name}`}
					// give explicit width to minimize layout shift
					height={500}
					width={500}
				/>
			</FlagWrapper>
			<CountryContent>
				<strong data-testid={`countryTitle-${i}`}>{country.name}</strong>

				<div>
					<ul>
						<li data-testid={`countryPopulation-${i}`}>
							<span>Population:</span> {nf.format(country.population)}
						</li>
						<li data-testid={`countryRegion-${i}`}>
							<span>Region:</span> {country.region}
						</li>
						<li data-testid={`countryCapital-${i}`}>
							<span>Capital:</span> {country.capital}
						</li>
					</ul>
				</div>
			</CountryContent>
		</CountryCardWrapper>
	);
};

const CountryCardWrapper = styled.div`
	background: var(--elementColor);
	border-radius: 10px;
	max-width: 275px;
	cursor: pointer;
	box-shadow: var(--boxShadow1);
	align-self: flex-start;

	&:hover {
		transform: scale(1.1, 1.1);
	}
`;

const CountryContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px;
	gap: 12.5px;
	margin-bottom: 30px;

	strong {
		font-size: 2rem;
		font-weight: var(--fontWeightBold);
		width: max-content;
		max-width: 22ch;
		line-height: 2.25rem;
	}

	li {
		font-weight: var(--fontWeightLight);
		line-height: 2.5rem;
	}

	span {
		font-weight: var(--fontWeightNormal);
	}
`;

const FlagWrapper = styled.div`
	width: 100%;

	img {
		border-radius: 10px 10px 0 0;

		/* override explicit img dimensions so flags true dimensions can be rendered */
		max-width: 100%;
		height: auto;
	}
`;

export default CountryCard;
