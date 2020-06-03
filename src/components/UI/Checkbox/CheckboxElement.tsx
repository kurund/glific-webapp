import { withFormsy } from "formsy-react";
import React from "react";
import { PassDownProps } from "formsy-react/dist/Wrapper";
import { Checkbox } from "@material-ui/core";

export interface CheckboxElementProps extends PassDownProps<string> {
	value: any;
}

const CheckboxElement: React.SFC<CheckboxElementProps> = (
	props: CheckboxElementProps
) => {
	const changeValue = (event: any) => {
		props.setValue(event.target.checked);
	};
	return <Checkbox value={props.value} onChange={changeValue} />;
};

export default withFormsy<CheckboxElementProps, string>(CheckboxElement);
