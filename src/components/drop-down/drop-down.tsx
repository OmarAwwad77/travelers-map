import React, {
	useState,
	Dispatch,
	SetStateAction,
	MouseEvent,
	CSSProperties,
} from 'react';
import {
	Wrapper,
	ChosenValue,
	List,
	ListItem,
	Input,
} from './drop-down.styles';

interface Props {
	onChangeHandler: Dispatch<SetStateAction<any>>;
	className?: string;
	styles?: CSSProperties;
	list: string[];
	value: string;
	disabled?: boolean;
}

const DropDown = (props: Props) => {
	const [isListShownState, setListShownState] = useState(false);

	const onClickHandler = (e: MouseEvent, value: string) => {
		props.onChangeHandler(value);
		setListShownState(false);
		e.stopPropagation();
	};

	const xhandler = () => {
		setListShownState((prevState) => !prevState);
	};

	return (
		<Wrapper disabled={props.disabled} onClick={xhandler}>
			<Input
				id={props.list[0]}
				onBlur={() => {
					setListShownState(false);
				}}
			/>
			<ChosenValue>{props.value}</ChosenValue>
			<List show={isListShownState}>
				{props.list.map((listItem) => (
					<ListItem key={listItem} onClick={(e) => onClickHandler(e, listItem)}>
						{listItem}
					</ListItem>
				))}
			</List>
		</Wrapper>
	);
};

export default DropDown;
