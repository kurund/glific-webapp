export interface Tag {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  is_reserved: boolean;
  language_id: number;
  parent_id: number;
  //created_date: Date;
}


export enum TagActions {
  ADD_TAG = "ADD_TAG",
  EDIT_TAG = "EDIT_TAG",
  DELETE_TAG = "DELETE_TAG",
}

interface TagActionType<T, P> {
  type: T;
  payload: P;
}

export type TagAction =
  | TagActionType<typeof TagActions.ADD_TAG, Tag>
  | TagActionType<typeof TagActions.EDIT_TAG, Tag>
  | TagActionType<typeof TagActions.DELETE_TAG, number>
  ;
