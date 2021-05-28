import {
	ListboxPopover,
	Listbox,
	ListboxOption,
	ListboxList
} from '@reach/listbox';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';

interface IProps {
	selectedRegion: string;
	setSelectedRegion: Dispatch<SetStateAction<string>>;
}

const RegionListbox = ({ selectedRegion, setSelectedRegion }: IProps) => {
	return (
		<ListboxWrapper>
			<VisuallyHidden id={`region-listbox`}>Filter By Region</VisuallyHidden>
			<StyledListbox
				data-testid="region-listbox"
				value={selectedRegion}
				onChange={setSelectedRegion}
				aria-labelledby="region-listbox">
				{/*// @ts-ignore */}
				<StyledListboxPopover>
					<ListboxList>
						<ListboxOption value="default">Filter By Region</ListboxOption>
						<ListboxOption value="Africa">Africa</ListboxOption>
						<ListboxOption value="Americas">Americas</ListboxOption>
						<ListboxOption data-testid="list-option-asia" value="Asia">
							Asia
						</ListboxOption>
						<ListboxOption data-testid="list-option-europe" value="Europe">
							Europe
						</ListboxOption>
						<ListboxOption value="Oceania">Oceania</ListboxOption>
					</ListboxList>
				</StyledListboxPopover>
			</StyledListbox>
		</ListboxWrapper>
	);
};

export default RegionListbox;

const ListboxWrapper = styled.div`
	display: flex;
	box-shadow: var(--boxShadow1);
`;

const StyledListboxPopover = styled(ListboxPopover)`
	background: var(--elementColor);
	font-size: var(--textFont1);
`;

const StyledListbox = styled(Listbox)`
	& > [data-reach-listbox-button] {
		border: none;
		background: var(--elementColor);
		width: max-content;
		border-radius: 5px;
		height: 45px;
		width: 175px;
		padding-left: 25px;
	}
`;
