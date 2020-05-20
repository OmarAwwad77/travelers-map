import React from 'react';

import { Wrapper, Avatar } from './add-comment.styles';

interface OwnProps {
	url: string;
}
type Props = OwnProps;

const AddComment: React.FC<Props> = ({ url }) => {
	return (
		<Wrapper>
			<Avatar url={url} />
			<input type='text' placeholder='Add a Comment' />
		</Wrapper>
	);
};

export default AddComment;
