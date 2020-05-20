import React, { ReactElement, ReactNode } from 'react';
import { Wrapper, SidBarTitle, Divider } from './sidebar.styles';

interface OwnProps {
	title?: string;
	width?: string;
	withDivider?: boolean;
	children: ReactElement[] | ReactNode;
}
type Props = OwnProps;
const SideBar: React.FC<Props> = ({ title, withDivider, children, width }) => {
	return (
		<Wrapper width={width}>
			{title && <SidBarTitle>{title}</SidBarTitle>}
			{withDivider && Array.isArray(children)
				? React.Children.map(
						children as ReactElement[],
						(node: ReactElement, i) =>
							children.length - 1 !== i ? (
								<>
									{node}
									<Divider />
								</>
							) : (
								node
							)
				  )
				: children}
		</Wrapper>
	);
};

export default SideBar;
