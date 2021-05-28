import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
}

const IconInput = ({ searchQuery, setSearchQuery }: IProps) => {
	return (
		<Wrapper>
			<IconWrapper>
				<FontAwesomeIcon icon={faSearch} size="lg" />
			</IconWrapper>
			<TextInput
				data-testid="country-search"
				type="text"
				value={searchQuery}
				onChange={e => {
					setSearchQuery(e.currentTarget.value.toLowerCase());
				}}
				placeholder="Search for a country..."
			/>
		</Wrapper>
	);
};

const Wrapper = styled.label`
	position: relative;
	display: block;
	width: 100%;
	max-width: 450px;
	border-radius: 5px;
	box-shadow: var(--boxShadow1);
`;

const IconWrapper = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 20px;
	height: 25px;
`;

const TextInput = styled.input`
	background-color: var(--elementColor);
	width: 100%;
	height: 45px;
	font-size: inherit;
	border: none;
	color: inherit;
	border-radius: 5px;
	padding-left: 60px;
	outline-offset: 2px;
`;

export default IconInput;
