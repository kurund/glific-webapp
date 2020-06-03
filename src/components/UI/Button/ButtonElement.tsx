import React from "react";
import { Button } from "@material-ui/core";

export interface ButtonElementProps {
	color?: "inherit" | "primary" | "secondary" | "default" | undefined;
	children: React.ReactNode;
	onClick?: () => void;
	type?: any;
}

const ButtonElement: React.SFC<ButtonElementProps> = (props) => {
	return (
		<Button
			type={props.type}
			variant="contained"
			color={props.color}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export default ButtonElement;
