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
import React, { useState } from "react";
import { Tag } from "../../../model/";
import styles from "./TagList.module.css";
import { history } from "../../../configureStore";
import { makeStyles } from "@material-ui/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export interface TagListProps {}

const GET_TAGS = gql`
	{
		tags {
			id
			label
			description
		}
	}
`;

const DELETE_TAG = gql`
	mutation deleteTag($id: ID!) {
		deleteTag(id: $id) {
			errors {
				key
				message
			}
		}
	}
`;

export const TagList: React.SFC<TagListProps> = () => {
	const classes = useStyles();
	let deleteId: number = 0;
	const { loading, error, data } = useQuery(GET_TAGS);
	const [deleteTag] = useMutation(DELETE_TAG, {
		update(cache, { data: { deleteTag } }) {
			const tags: any = cache.readQuery({ query: GET_TAGS });
			tags.tags = tags.tags.filter((val: any) => val.id !== deleteId);
			cache.writeQuery({
				query: GET_TAGS,
				data: tags,
			});
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	const tagList = data.tags;

	const deleteHandler = (id: number) => {
		deleteId = id;
		deleteTag({ variables: { id } });
	};

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
					{tagList.map((n: any) => {
						return (
							<TableRow key={n.id} hover>
								<TableCell padding="default">{n.label}</TableCell>
								<TableCell padding="default">{n.description || "-"}</TableCell>
								<TableCell padding="default">
									<IconButton
										aria-label="Edit"
										color="default"
										onClick={() => history.push(`/tag/${n.id}/edit`)}
										className={classes.noVerticalPadding}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() => deleteHandler(n.id)}
										className={classes.noVerticalPadding}
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

const useStyles = makeStyles(() => ({
	noVerticalPadding: {
		padding: "0px 12px",
	},
}));
