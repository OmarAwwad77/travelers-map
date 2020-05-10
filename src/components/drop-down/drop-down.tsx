import React, {
	useState,
	Dispatch,
	SetStateAction,
	MouseEvent,
	CSSProperties,
} from 'react';
import styled, { css } from 'styled-components';

interface Props {
	onChangeHandler: Dispatch<SetStateAction<any>>;
	className?: string;
	styles?: CSSProperties;
	list: string[];
	value: string;
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
	position: relative;
	border: 1px solid rgba(0, 0, 0, 0.2);

	&::after {
		content: '';
		display: inline-block;
		position: absolute;
		right: 5%;
		top: 45%;
		transform: rotate(180deg);
		width: 0;
		height: 0;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;
		border-bottom: 6px solid black;
	}
`;

const ChosenValue = styled.span`
	display: block;
	position: absolute;
	top: 50%;
	left: 14%;
	transform: translate(0, -50%);
	z-index: 1;
`;

const List = styled.div<{ show: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 5px 10px;
	border: 1px solid #eee;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
	background-color: #eee;
	position: relative;
	top: 100%;
	z-index: 5;
	transition: all 0.3s ease;
	${(p) =>
		p.show
			? css`
					opacity: 1;
					visibility: visible;
			  `
			: css`
					opacity: 0;
					visibility: hidden;
			  `}
`;

const ListItem = styled.span`
	margin: 4px 0;

	&:hover {
		color: #ff0061;
	}
	&:active ${List} {
		opacity: 1;
		visibility: visible;
	}
`;

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
		<Wrapper onClick={xhandler}>
			<input
				id={props.list[0]}
				style={{
					height: '100%',
					width: '100%',
					position: 'absolute',
					top: '50%',
					left: '50%',
					zIndex: 22,
					transform: 'translate(-50%, -50%)',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					color: 'transparent',
					background: 'transparent',
				}}
				onBlur={() => {
					console.log('onBlur');
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
