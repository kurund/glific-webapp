import { withFormsy } from "formsy-react";
import React from "react";
import { PassDownProps } from "formsy-react/dist/Wrapper";
import { Select, MenuItem } from "@material-ui/core";

export interface DropdownElementProps extends PassDownProps<string> {
	value: any;
	options: any;
}

class DropdownElement extends React.Component<DropdownElementProps> {
	constructor(props: DropdownElementProps) {
		super(props);
		this.changeValue = this.changeValue.bind(this);
	}

	changeValue(event: any) {
		this.props.setValue(event.target.value);
	}

	render() {
		const options = this.props.options && this.props.options.map((option: any) => {
			return <MenuItem value={option.id} key={option.id}>
				{option.label}
			</MenuItem>
		});

		return (
			<Select value={this.props.value || ""} onChange={this.changeValue} >
				{options}
			</Select >
		);
	}
}

export default withFormsy<DropdownElementProps, string>(DropdownElement);
