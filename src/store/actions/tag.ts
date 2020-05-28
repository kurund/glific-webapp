import { TagAction, TagActions, Tag } from "../../model/";

export function addTag(tag: Tag): TagAction {
  return {
    type: TagActions.ADD_TAG,
    payload: tag,
  };
}

export function editTag(tag: Tag): TagAction {
  return {
    type: TagActions.EDIT_TAG,
    payload: tag,
  };
}

export function deleteTag(tagId: number): TagAction {
  return {
    type: TagActions.DELETE_TAG,
    payload: tagId,
  };
}
