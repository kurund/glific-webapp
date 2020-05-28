import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import { history } from "../../configureStore";
import styles from "./TagPage.module.css";
import { TagList } from "../../containers/Tag/TagList/TagList";

export interface TagProps {}

export const TagPage: React.SFC<TagProps> = () => {
	return (
		<Grid container className={styles.TagPage}>
			<Grid item xs={6}>
				<div className={styles.Title}>
					<Typography variant="h4" gutterBottom>
						Tag List
					</Typography>
				</div>
			</Grid>
			<Grid item xs={6}>
				<div className={styles.ButtonContainer}>
					<Button
						className={styles.Button}
						variant="contained"
						color="secondary"
						onClick={() => history.push("/tag/add")}
					>
						Add Tag
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<TagList />
			</Grid>
		</Grid>
	);
};
