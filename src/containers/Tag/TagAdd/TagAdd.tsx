import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import styles from "./TagAdd.module.css";
import ButtonElement from "../../../components/UI/Button/ButtonElement";
import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";

export interface TagAddProps {}

export const TagAdd: React.SFC<TagAddProps> = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [isReserved, setIsReserved] = useState(false);
	const [languageId, setLanguageId] = useState("");
	const [parentId, setParentId] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);

	const tagActions = useActions(TagActions);

	const saveHandler = () => {
		tagActions.addTag({
			id: Math.random(),
			name: name,
			description: description,
			is_active: isActive,
			is_reserved: isReserved,
			language_id: languageId,
			parent_id: parentId,
		});

		setFormSubmitted(true);
	};

	const cancelHandler = () => {
		setFormSubmitted(true);
	};

	if (formSubmitted) {
		return <Redirect to="/tag" />;
	}

	let form = (
		<React.Fragment>
			<div className={styles.Input}>
				<label className={styles.Label}>Name</label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(event) => setName(event?.target.value)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Description</label>
				<input
					type="text"
					name="description"
					value={description}
					onChange={(event) => setDescription(event?.target.value)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Is Active?</label>
				<input
					type="checkbox"
					name="is_active"
					checked={isActive}
					onChange={(event) => setIsActive(event?.target.checked)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Is Reserved?</label>
				<input
					type="checkbox"
					name="is_reserved"
					checked={isReserved}
					onChange={(event) => setIsReserved(event?.target.checked)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Language</label>
				<input
					type="number"
					name="language_id"
					value={languageId}
					onChange={(event) => setLanguageId(event?.target.value)}
				/>
			</div>
			<div className={styles.Input}>
				<label className={styles.Label}>Parent</label>
				<input
					type="number"
					name="parent_id"
					value={parentId}
					onChange={(event) => setParentId(event?.target.value)}
				/>
			</div>
			<ButtonElement color="primary" onClick={saveHandler}>
				Save
			</ButtonElement>
			&nbsp;
			<ButtonElement color="secondary" onClick={cancelHandler}>
				Cancel
			</ButtonElement>
		</React.Fragment>
	);

	return (
		<div className={styles.TagAdd}>
			<h4>Enter the tag information</h4>
			{form}
		</div>
	);
};
