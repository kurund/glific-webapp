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
	// const [isActiveError, setIsActiveError] = useState(false);
	// const [isReservedError, setIsReservedError] = useState(false);
	const [languageIdError, setLanguageIdError] = useState(false);
	const [parentIdError, setParentIdError] = useState(false);

	const tagActions = useActions(TagActions);

	const errorMessage = "Empty entry."

	const validateEntries = () => {
		let noError = true;
		console.log("validating")
		if (name === "") {
			console.log("hi there");
			noError = false;
			setNameError(true);
		}
		if (description === "") {
			noError = false;
			setDescriptionError(true);
		}
		if (languageId === "") {
			noError = false;
			setLanguageIdError(true);
		}
		if (parentId === "") {
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
			<div style={{ height: '80px' }} className={styles.Input}>
				<label className={styles.Label}>Name</label>
				<TextField
					required
					error={nameError && name == ""}
					defaultValue={name}
					InputLabelProps={{ shrink: true, }}
					label="Name"
					helperText={nameError && name == "" ? errorMessage : ""}
					onChange={(event) => setName(event?.target.value)}
				/>
			</div>
			<div style={{ height: '80px' }} className={styles.Input}>
				<label className={styles.Label}>Description</label>
				<TextField
					required
					error={descriptionError && description == ""}
					defaultValue={description}
					InputLabelProps={{ shrink: true, }}
					label="Description"
					helperText={descriptionError && description == "" ? errorMessage : ""}
					onChange={(event) => setDescription(event?.target.value)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Is Active?</label>
				<Checkbox
					name="is_active"
					checked={isActive}
					onChange={(event) => setIsActive(event?.target.checked)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Is Reserved?</label>
				<Checkbox
					name="is_reserved"
					checked={isReserved}
					onChange={(event) => setIsReserved(event?.target.checked)}
				/>
			</div>
			<div style={{ height: '80px' }} className={styles.Input}>
				<label className={styles.Label}>Language</label>
				<TextField
					required
					error={languageIdError && languageId == ""}
					defaultValue={languageId}
					InputLabelProps={{ shrink: true, }}
					label="Language"
					helperText={languageIdError && languageId == "" ? errorMessage : ""}
					onChange={(event) => setLanguageId(event?.target.value)}
				/>
			</div>
			<div style={{ height: '80px' }} className={styles.Input}>
				<label className={styles.Label}>Parent</label>
				<TextField
					required
					error={parentIdError && parentId == ""}
					defaultValue={parentId}
					InputLabelProps={{ shrink: true, }}
					label="Parent"
					helperText={parentIdError && parentId == "" ? errorMessage : ""}
					onChange={(event) => setParentId(event?.target.value)}
				/>
			</div>
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


// REFERENCE FOR CLEANER CODE

// let formNamesAndFuncs: {[entryName: string]: [any, Function]} = {
// 	'Name': [name, setName],
// 	'Description': [description, setDescription],
// 	'Language': [languageId, setLanguageId],
// 	'Parent': [parentId, setParentId],
// }

// let formEntries = Object.keys(formNamesAndFuncs).map((fieldName) => {
// 	return (
// 		<div style={{height: '80px'}}>
// 			<label className={styles.Label}>{fieldName}</label>
// 			<TextField
// 				required
// 				error={formNamesAndFuncs[fieldName][0] === "" ? true : false}
// 				defaultValue={formNamesAndFuncs[fieldName][0]}
// 				InputLabelProps={{ shrink: true, }} 
// 				label={fieldName}
// 				helperText={formNamesAndFuncs[fieldName][0] === "" ? "Empty entry." : ""}
// 				onChange={(e) => {

// 					formNamesAndFuncs[fieldName][1](e?.target.value)
// 				}} 
// 			/>
// 		</div>
// 	)
// })

// let formChecksAndFuncs: {[entryName: string]: [any, Function]} = {
// 	'Is Active?': [isActive, setIsActive],
// 	'Is Reserved?': [isReserved, setIsReserved],
// }

// let formChecks = Object.keys(formChecksAndFuncs).map((fieldName) => {
// 	return (
// 		<div style={{height: '80px', width: '100%'}}>
// 			<label className={styles.Label}>{fieldName}</label>
// 			<Checkbox
// 				required
// 				defaultChecked={formChecksAndFuncs[fieldName][0]}
// 				onChange={(e) => formChecksAndFuncs[fieldName][1](e?.target.checked)} 
// 			/>
// 		</div>
// 	)
// })