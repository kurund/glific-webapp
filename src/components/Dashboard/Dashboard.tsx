import React from "react";
import { Typography } from "@material-ui/core";

import styles from "./Dashboard.module.css";

export interface DashboardProps {}

export const Dashboard: React.SFC<DashboardProps> = () => {
	return (
		<div className={styles.Dashboard}>
			<Typography variant="h4" gutterBottom>
				Welcome to Glific
			</Typography>
		</div>
	);
};
