import { withFormsy } from "formsy-react";
import React from "react";
import { PassDownProps } from "formsy-react/dist/Wrapper";
import { Select, MenuItem } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_LANGUAGES = gql`
	{
		languages {
			id
			label
		}
	}
`;

export interface DropdownElementProps extends PassDownProps<string> {
	value: any;
}

const DropdownElement: React.SFC<DropdownElementProps> = (
	props: DropdownElementProps
) => {
	const languages = useQuery(GET_LANGUAGES);
	const handleChange = (event: any) => {
		const value = event.target.value;
		props.setValue(value);
	};

	const languageOptions = languages.data
		? languages.data.languages.map((language: any) => {
				return (
					<MenuItem value={language.id} key={language.id}>
						{language.label}
					</MenuItem>
				);
		  })
		: null;
	return (
		<Select value={props.value} onChange={handleChange}>
			{languageOptions}
		</Select>
	);
};

export default withFormsy<DropdownElementProps, string>(DropdownElement);
