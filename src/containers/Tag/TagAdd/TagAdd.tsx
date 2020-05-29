import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	TextField,
	Checkbox,
} from "@material-ui/core";

import styles from "./TagAdd.module.css";
import ButtonElement from "../../../components/UI/Button/ButtonElement";
import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";
import { RootState } from "../../../store/reducers";
import { TagEntry } from "./TagEntry";
import { TagCheckbox } from "./TagCheckbox";

interface TagAddProps {
	match: any;
}

export const TagAdd: React.SFC<TagAddProps> = (props: TagAddProps) => {
	const tagList = useSelector((state: RootState) => state.tagList);
	const tagId = props.match ? props.match.params.id : null;
	const tag = tagId ? tagList.find((tag) => tag.id == tagId) : null;

	const [name, setName] = useState(tag ? tag.name : "");
	const [description, setDescription] = useState(tag ? tag.description : "");
	const [isActive, setIsActive] = useState(tag ? tag.is_active : false);
	const [isReserved, setIsReserved] = useState(tag ? tag.is_reserved : false);
	const [languageId, setLanguageId] = useState(tag ? tag.language_id : "");
	const [parentId, setParentId] = useState(tag ? tag.parent_id : "");
	const [formSubmitted, setFormSubmitted] = useState(false);

	const [nameError, setNameError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [languageIdError, setLanguageIdError] = useState(false);
	const [parentIdError, setParentIdError] = useState(false);

	const tagActions = useActions(TagActions);

	const emptyMessage = "Empty entry."
	const negativeMessage = "Cannot have negative entries."

	const validateEntries = () => {
		let noError = true;
		if (name === "") {
			noError = false;
			setNameError(true);
		}
		if (description === "") {
			noError = false;
			setDescriptionError(true);
		}
		console.log("LanguageID:" + +languageId);
		if (languageId === "" || +languageId < 0) {
			console.log("error here");
			console.log(+languageId < 0);
			noError = false;
			setLanguageIdError(true);
		}
		if (parentId === "" || +parentId < 0) {
			noError = false;
			setParentIdError(true);
		}
		return noError;
	}

	const saveHandler = () => {
		if (!validateEntries()) {
			return;
		}
		let payload = {
			id: tag ? tagId : Math.random(),
			name: name,
			description: description,
			is_active: isActive,
			is_reserved: isReserved,
			language_id: languageId,
			parent_id: parentId,
		}
		if (tag) {
			tagActions.editTag(payload);
		} else {
			tagActions.addTag(payload);
		}

		setFormSubmitted(true);
	};

	const cancelHandler = () => {
		setFormSubmitted(true);
	};

	if (formSubmitted) {
		return <Redirect to="/tag" />;
	}

	let form = (
		<>
			<TagEntry
				name="Name" 
				error={nameError} 
				value={name}
				type="text"
				errorMsg={emptyMessage} 
				callBack={setName} 
			/>
			<TagEntry
				name="Description" 
				error={descriptionError} 
				value={description} 
				type="text"
				errorMsg={emptyMessage} 
				callBack={setDescription} 
			/>
			<TagCheckbox
				name="Is Active?"
				value={isActive}
				callBack={setIsActive}
			/>
			<TagCheckbox
				name="Is Reserved?"
				value={isReserved}
				callBack={setIsReserved}
			/>
			<TagEntry
				name="Language" 
				error={languageIdError} 
				value={languageId}
				type="number"
				errorMsg={languageIdError && +languageId >= 0 ? emptyMessage : negativeMessage} 
				callBack={setLanguageId} 
			/>
			<TagEntry
				name="Parent" 
				error={parentIdError} 
				value={parentId}
				type="number"
				errorMsg={parentIdError && +parentId >= 0 ? emptyMessage : negativeMessage}
				callBack={setParentId} 
			/>

			<div className="buttons" style={{ marginTop: '10px' }}>
				<ButtonElement color="primary" onClick={saveHandler}>
					Save
				</ButtonElement>
				&nbsp;
				<ButtonElement color="secondary" onClick={cancelHandler}>
					Cancel
				</ButtonElement>
			</div>
		</>
	);

	return (
		<div className={styles.TagAdd}>
			<h4>{tag ? 'Edit tag information' : 'Enter tag information'}</h4>
			<form autoComplete="off">
				{form}
			</form>
		</div>
	);
};