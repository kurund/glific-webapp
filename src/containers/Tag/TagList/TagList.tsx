import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";
import { Tag } from "../../../model/";
import { RootState } from "../../../store/reducers";
import styles from "./TagList.module.css";

export interface TagListProps {}

export const TagList: React.SFC<TagListProps> = () => {
	const tagList = useSelector((state: RootState) => state.tagList);
	const tagActions = useActions(TagActions);

	return (
		<Paper className={styles.Paper}>
			<Table className={styles.Table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Name</TableCell>
						<TableCell padding="default">Description</TableCell>
						<TableCell padding="default"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tagList.map((n: Tag) => {
						return (
							<TableRow key={n.id} hover>
								<TableCell padding="none">{n.name}</TableCell>
								<TableCell padding="none">{n.description}</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Edit"
										color="default"
										onClick={() => tagActions.editTag(n.id)}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() => tagActions.deleteTag(n.id)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
};
