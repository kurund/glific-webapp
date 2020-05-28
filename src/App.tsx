import * as React from "react";
import {
	AppBar,
	Badge,
	Divider,
	Drawer as DrawerMui,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	//useMediaQuery,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import LabelIcon from "@material-ui/icons/Label";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";

import { Route, Router } from "react-router-dom";
import { history } from "./configureStore";
import { TagAdd } from "./containers/Tag/TagAdd/TagAdd";
import { TagEdit } from "./containers/Tag/TagEdit/TagEdit";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TagPage } from "./components/TagPage/TagPage";
import { withRoot } from "./withRoot";
import styles from "./App.module.css";

const Routes = () => {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={Dashboard} />
			<Route exact={true} path="/dashboard" component={Dashboard} />
			<Route exact={true} path="/tag" component={TagPage} />
			<Route exact={true} path="/tag/add" component={TagAdd} />
			<Route exact={true} path="/tag/:id/edit" component={TagEdit} />
		</div>
	);
};

const Drawer = () => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/tag")}>
					<ListItemIcon>
						<Badge color="secondary">
							<LabelIcon />
						</Badge>
					</ListItemIcon>
					<ListItemText primary="Tag" />
				</ListItem>
			</List>
		</div>
	);
};

const App = () => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);
	// const isMobile = useMediaQuery((theme: Theme) =>
	// 	theme.breakpoints.down("sm")
	// );
	const isMobile = false;

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Router history={history}>
			<div className={styles.App}>
				<div className={styles.AppFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap={isMobile}>
								Glific
							</Typography>
						</Toolbar>
					</AppBar>
					<Hidden mdUp>
						<DrawerMui
							variant="temporary"
							anchor={"left"}
							open={mobileOpen}
							classes={{
								paper: classes.drawerPaper,
							}}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<Drawer />
						</DrawerMui>
					</Hidden>
					<Hidden smDown>
						<DrawerMui
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Drawer />
						</DrawerMui>
					</Hidden>
					<Routes />
				</div>
			</div>
		</Router>
	);
};

const drawerWidth = 200;
const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 200,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));

export default withRoot(App);
