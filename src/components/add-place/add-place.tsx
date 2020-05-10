import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
	Wrapper,
	TripNameWrapper,
	DropDownWrapper,
	TripInput,
	Or,
	TripDescription,
} from './add-place.styles';
import WithModel from '../../hoc/with-model/with-model';
import DropDown from '../drop-down/drop-down';
import ImageUpload from '../image-upload/image-upload';

const options = ['paris', 'amsterdam', 'london'];

const AddPlace = () => {
	const [selected, setSelected] = useState('choose a trip');
	const { goBack } = useHistory();
	return (
		<WithModel backDropOnClick={goBack}>
			<Wrapper>
				<TripNameWrapper>
					<DropDownWrapper>
						<DropDown
							list={options}
							value={selected}
							onChangeHandler={setSelected}
						/>
					</DropDownWrapper>
					<Or>or</Or>
					<TripInput placeholder='add new trip' />
				</TripNameWrapper>
				<TripDescription placeholder='Place Description' />
				<ImageUpload
					inputId='main'
					loading={false}
					onCancel={() => {}}
					onChange={() => {}}
					onSwitch={() => {}}
				/>
			</Wrapper>
		</WithModel>
	);
};

export default AddPlace;
