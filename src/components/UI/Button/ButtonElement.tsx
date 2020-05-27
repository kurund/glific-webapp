import React from "react";
import { Button } from "@material-ui/core";

export interface ButtonElementProps {
	color?: string;
	children: React.ReactNode;
	onClick: () => void;
}

const ButtonElement: React.SFC<ButtonElementProps> = (props) => {
	return (
		<Button variant="contained" color="primary" onClick={props.onClick}>
			{props.children}
		</Button>
	);
};

export default ButtonElement;
