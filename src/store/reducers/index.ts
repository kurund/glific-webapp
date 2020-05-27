import { History } from "history";
import { combineReducers } from "redux";
import { Tag } from "../../model/";
import * as tagReducer from "./tag";

export interface RootState {
	tagList: Tag[];
}

export default (history: History) =>
	combineReducers({
		...tagReducer,
	});
