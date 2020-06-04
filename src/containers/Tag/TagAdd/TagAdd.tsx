import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "./TagAdd.module.css";
import ButtonElement from "../../../components/UI/Button/ButtonElement";
import CheckboxElement from "../../../components/UI/Checkbox/CheckboxElement";
import { Tag } from "../../../model";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Formsy from "formsy-react";
import TextFieldElement from "../../../components/UI/TextField/TextFieldElement";

interface TagAddProps {
	match: any;
}

const GET_LANGUAGES = gql`
	{
		languages {
			id
			label
		}
	}
`;

const GET_TAGS = gql`
	{
		tags {
			id
			description
			label
		}
	}
`;

const GET_TAG = gql`
	query getTag($id: ID!) {
		tag(id: $id) {
			tag {
				id
				label
				description
				isActive
				isReserved
				language {
					id
				}
			}
		}
	}
`;

const CREATE_TAG = gql`
	mutation creTag($input: TagInput!) {
		createTag(input: $input) {
			tag {
				id
				description
				label
				isActive
				isReserved
				language {
					id
				}
			}
		}
	}
`;

const UPDATE_TAG = gql`
	mutation updateTag($id: ID!, $input: TagInput!) {
		updateTag(id: $id, input: $input) {
			tag {
				id
				label
				isActive
				isReserved
				description
				language {
					id
					label
				}
			}
			errors {
				key
				message
			}
		}
	}
`;

export const TagAdd: React.SFC<TagAddProps> = (props: TagAddProps) => {
	const tagId = props.match.params.id ? props.match.params.id : false;
	const { loading, error, data } = useQuery(GET_TAG, {
		variables: { id: tagId },
		skip: !tagId,
	});
	const [updateTag] = useMutation(UPDATE_TAG);

	const [label, setLabel] = useState("");
	const [description, setDescription] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [isReserved, setIsReserved] = useState(false);
	const [languageId, setLanguageId] = useState(1);
	const [parentId, setParentId] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);
	const languages = useQuery(GET_LANGUAGES);
	const [createTag] = useMutation(CREATE_TAG, {
		update(cache, { data: { createTag } }) {
			const tags: any = cache.readQuery({ query: GET_TAGS });

			cache.writeQuery({
				query: GET_TAGS,
				data: { tags: tags.tags.concat(createTag.tag) },
			});
		},
	});

	let tag: any = null;

	useEffect(() => {
		if (tagId && data) {
			tag = tagId ? data.tag.tag : null;
			setLabel(tag.label);
			setDescription(tag.description);
			setIsActive(tag.isActive);
			setIsReserved(tag.isReserved);
			setLanguageId(tag.language.id);
			setParentId(tag.parent_id);
		}
	}, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const saveHandler = () => {
		const payload = {
			label: label,
			description: description,
			isActive: true,
			isReserved: true,
			languageId: Number(languageId),
		};

		if (tagId) {
			updateTag({
				variables: {
					id: tagId,
					input: payload,
				},
			});
		} else {
			createTag({
				variables: {
					input: payload,
				},
			});
		}
		setFormSubmitted(true);
	};

	const setValues = (value: any) => {
		setLabel(value.label);
		setDescription(value.description);
		setIsActive(value.isActive);
		setIsReserved(value.isReserved);
		setLanguageId(value.language);
	};
	const cancelHandler = () => {
		setFormSubmitted(true);
	};

	if (formSubmitted) {
		return <Redirect to="/tag" />;
	}

	const languageOptions = languages.data
		? languages.data.languages.map((language: any) => {
			return (
				<option value={language.id} key={language.id}>
					{language.label}
				</option>
			);
		})
		: null;

	// Assign the names for the different form questions.

	let textEntries: { [text: string]: string } = {
		label: label,
		description: description,
	};
	let checkEntries: { [text: string]: boolean } = {
		isActive: isActive,
		isReserved: isReserved,
	};
	let numEntries: { [text: string]: number | string } = {
		language: languageId,
		Parent: tag ? +tag.parent_id : "",
	};

	let textCards = Object.keys(textEntries).map((entryName, i) => {
		return (
			<div className={styles.Input} key={i}>
				<label className={styles.Label}>{entryName}</label>
				<TextFieldElement
					value={textEntries[entryName]}
					name={entryName}
					type="text"
					validations="isWords"
					validationError="Invalid input."
					required
				/>
			</div>
		);
	});

	let checkCards = Object.keys(checkEntries).map((entryName, i) => {
		return (
			<div className={styles.Input} key={i}>
				<label className={styles.Label}>{entryName}</label>
				<CheckboxElement value={checkEntries[entryName]} name={entryName} />
			</div>
		);
	});

	let numCards = Object.keys(numEntries).map((entryName, i) => {
		return (
			<div className={styles.Input} key={i}>
				<label className={styles.Label}>{entryName}</label>
				<TextFieldElement
					value={numEntries[entryName]}
					name={entryName}
					type="number"
					validations="isNumeric,isExisty"
					validationError="Invalid input."
					required
				/>
			</div>
		);
	});

	return (
		<div className={styles.TagAdd}>
			<h4>{tagId ? "Edit tag information" : "Enter tag information"}</h4>
			<Formsy onValidSubmit={saveHandler} onChange={setValues}>
				{textCards}
				{checkCards}
				{numCards}
				<div className={styles.Buttons}>
					<ButtonElement type="submit" color="primary">
						Submit
					</ButtonElement>
					&nbsp;
					<ButtonElement color="default" onClick={cancelHandler}>
						Cancel
					</ButtonElement>
				</div>
			</Formsy>
		</div>
	);
};
