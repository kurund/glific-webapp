import { TagAction, TagActions, Tag } from "../../model";
import createReducer from "./createReducer";

export const tagList = createReducer<Tag[]>([], {
  [TagActions.ADD_TAG](state: Tag[], action: TagAction) {
    return [...state, action.payload];
  },
  [TagActions.DELETE_TAG](state: Tag[], action: TagAction) {
    // remove tag with the given id
    return state.filter(t => t.id !== action.payload);
  },
});
