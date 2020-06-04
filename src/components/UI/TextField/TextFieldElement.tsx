import { withFormsy } from "formsy-react";
import React from "react";
import { PassDownProps } from "formsy-react/dist/Wrapper";
import { TextField } from "@material-ui/core";

// PassDownProps may be better used as FormsyInjectedProps, but FormsyInjectedProps doesn't work here for some reason.

// export interface FormsyInjectedProps<T> {
//     getValue: () => T;
//     setValue: (value: T | undefined) => void;
//     getErrorMessage: () => string;
//     showRequired: () => boolean;
//     showError: () => boolean;
// }

export interface TextFieldElementProps extends PassDownProps<string> {
	type: any;
	value: any;
}

class TextFieldElement extends React.Component<TextFieldElementProps> {
	constructor(props: TextFieldElementProps) {
		super(props);
		this.changeValue = this.changeValue.bind(this);
	}

	changeValue(event: any) {
		this.props.setValue(event.currentTarget.value);
	}

	render() {
		return (
			<TextField
				onChange={this.changeValue}
				label={this.props.name}
				InputLabelProps={{ shrink: true }}
				type={this.props.type}
				required
				value={this.props.value || ""}
				helperText={this.props.showError ? this.props.errorMessage : ""}
				error={this.props.showError}
			/>
		);
	}
}

export default withFormsy<TextFieldElementProps, string>(TextFieldElement);
