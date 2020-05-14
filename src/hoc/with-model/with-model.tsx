import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
	Backdrop,
	Model,
	ModelClose,
	ModelContent,
} from '../../components/model-backdrop/model-backdrop.styles';

const Wrapper = styled.div``;

interface OwnProps {
	backDropOnClick?: (e: MouseEvent) => void;
}
type Props = OwnProps;

const WithModel: React.FC<Props> = ({ backDropOnClick, children }) => {
	const { goBack } = useHistory();
	return (
		<Wrapper>
			<Backdrop onClick={backDropOnClick ?? goBack} />
			<Model>
				<ModelClose onClick={backDropOnClick} />
				<ModelContent>{children}</ModelContent>
			</Model>
		</Wrapper>
	);
};

export default WithModel;
