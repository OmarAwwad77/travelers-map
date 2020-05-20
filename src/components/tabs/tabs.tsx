import React, { useState, Children, ReactElement } from 'react';

import {
	Wrapper,
	TabsWrapper,
	Tab,
	BorderBottom,
	TabContent,
	TabName,
} from './tabs.styles';
export { Tab };

const Tabs: React.FC<{}> = ({ children }) => {
	const [currentTab, setCurrentTab] = useState(0);

	const tabs: ReactElement[] = Children.map(
		children as ReactElement[],
		(ele: ReactElement) => ele
	);
	const count = Children.count(children);
	const borderBottomWidth = 100 / count;
	const borderBottomLeft = borderBottomWidth * currentTab;

	return (
		<Wrapper>
			<TabsWrapper>
				{tabs.map((tab, i) => (
					<TabName key={i} count={count} onClick={() => setCurrentTab(i)}>
						{tab.props.name}
					</TabName>
				))}
				<BorderBottom
					left={`${borderBottomLeft}%`}
					width={`${borderBottomWidth}%`}
				/>
			</TabsWrapper>
			<TabContent>{tabs[currentTab]}</TabContent>
		</Wrapper>
	);
};

export default Tabs;
