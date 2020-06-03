import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./TagAdd.module.css";
import ButtonElement from "../../../components/UI/Button/ButtonElement";
import CheckboxElement from "../../../components/UI/Checkbox/CheckboxElement";
import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";
import { RootState } from "../../../store/reducers";

import Formsy from 'formsy-react';
import TextFieldElement from "../../../components/UI/TextField/TextFieldElement";

interface TagAddProps {
	match: any;
}

export const TagAdd: React.SFC<TagAddProps> = (props: TagAddProps) => {
	const tagList = useSelector((state: RootState) => state.tagList);
	const tagId = props.match ? props.match.params.id : null;
	const tag = tagId ? tagList.find((tag) => tag.id === tagId) : null;

	// None of these set methods are needed (for now).
	const [name, setName] = useState(tag ? tag.name : "");
	const [description, setDescription] = useState(tag ? tag.description : "");
	const [isActive, setIsActive] = useState(tag ? tag.is_active : false);
	const [isReserved, setIsReserved] = useState(tag ? tag.is_reserved : false);
	const [languageId, setLanguageId] = useState(tag ? tag.language_id : "");
	const [parentId, setParentId] = useState(tag ? tag.parent_id : "");
	const [formSubmitted, setFormSubmitted] = useState(false);
	const tagActions = useActions(TagActions);

	const saveHandler = (data: any, resetFunc: Function, invalidateForm: Function) => {
		let payload = {
			id: tag ? tagId : Math.random(),
			name: data["Name"],
			description: data["Description"],
			is_active: data["Is Active?"],
			is_reserved: data["Is Reserved?"],
			language_id: data["Language"],
			parent_id: data["Parent"],
		}

		if (tag) {
			tagActions.editTag(payload);
		} else {
			tagActions.addTag(payload);
		}
		setFormSubmitted(true);
	}

	const cancelHandler = () => {
		setFormSubmitted(true);
	};

	if (formSubmitted) {
		return <Redirect to="/tag" />;
	}

	// Assign the names for the different form questions.
	let textEntries: { [text: string]: string; } = { "Name": name, "Description": description };
	let checkEntries: { [text: string]: boolean; } = { "Is Active?": isActive, "Is Reserved?": isReserved };
	let numEntries: { [text: string]: number; } = { "Language": +languageId, "Parent": +parentId };

	let textCards = Object.keys(textEntries).map((entryName, i) => {
		return (
			<div className={styles.Input} key={i}>
				<label className={styles.Label}>{entryName}</label>
				<TextFieldElement value={textEntries[entryName]} name={entryName} type="text" validations="isWords" validationError="Invalid input." required />
			</div>
		);
	})

	let checkCards = Object.keys(checkEntries).map((entryName, i) => {
		return (
			<div className={styles.Input} key={i}>
				<label className={styles.Label}>{entryName}</label>
				<CheckboxElement
					value={checkEntries[entryName]}
					name={entryName}
				/>
			</div>
		)
	});

	let numCards = Object.keys(numEntries).map((entryName, i) => {
		return (
			<div className={styles.Input} key={i}>
				<label className={styles.Label}>{entryName}</label>
				<TextFieldElement value={numEntries[entryName]} name={entryName} type="number" validations="isNumeric,isExisty" validationError="Invalid input." required />
			</div>
		)
	});

	return (
		<div className={styles.TagAdd}>
			<h4>{tag ? 'Edit tag information' : 'Enter tag information'}</h4>
			<Formsy onValidSubmit={saveHandler}>
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