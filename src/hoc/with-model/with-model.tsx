import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import {
	Backdrop,
	Model,
	ModelClose,
} from '../../components/model-backdrop/model-backdrop.styles';

const Wrapper = styled.div``;

interface OwnProps {
	backDropOnClick: (e: MouseEvent) => void;
}
type Props = OwnProps;

const WithModel: React.FC<Props> = ({ backDropOnClick, children }) => {
	return (
		<Wrapper>
			<Backdrop onClick={backDropOnClick} />
			<Model>
				<ModelClose onClick={backDropOnClick} />

				{children}
			</Model>
		</Wrapper>
	);
};

export default WithModel;
