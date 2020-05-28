import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	TextField,
} from "@material-ui/core";

import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";

import styles from "./TagDialog.module.css";

interface Props {
	open: boolean;
	onClose: () => void;
}

export const TagDialog = (props: Props) => {
	const { open, onClose } = props;
	const [newTodoText, setNewTodoText] = useState("");
	// const [tagForm, setTagForm] = useState({
	// 	name
	// })
	const tagActions = useActions(TagActions);

	const handleClose = () => {
		tagActions.addTag({
			id: Math.random(),
			completed: false,
			text: newTodoText,
		});
		onClose();

		// reset todo text if user reopens the dialog
		setNewTodoText("");
	};

	const handleChange = (event: any) => {
		setNewTodoText(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add a new Tag</DialogTitle>
			<TextField
				id="multiline-flexible"
				multiline
				value={newTodoText}
				onChange={handleChange}
				className={styles.TextField}
			/>

			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
};
