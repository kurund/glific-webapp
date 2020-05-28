import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./TagEdit.module.css";
import ButtonElement from "../../../components/UI/Button/ButtonElement";
import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";
import { RootState } from "../../../store/reducers";

interface TagEditProps {
  match: any;
}

export const TagEdit: React.SFC<TagEditProps> = (props: TagEditProps) => {
  const tagList = useSelector((state: RootState) => state.tagList);
  const tagId = props.match.params.id;
  const tag = tagList.find((tag) => tag.id == tagId);

  const [name, setName] = useState(tag?.name);
  const [description, setDescription] = useState(tag?.description);
  const [isActive, setIsActive] = useState(tag ? tag.is_active : false);
  const [isReserved, setIsReserved] = useState(tag ? tag.is_reserved : false);
  const [languageId, setLanguageId] = useState(tag ? tag.language_id : "");
  const [parentId, setParentId] = useState(tag ? tag.parent_id : "");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const tagActions = useActions(TagActions);

  const saveHandler = () => {
    tagActions.editTag({
      id: tagId,
      name: name,
      description: description,
      is_active: isActive,
      is_reserved: isReserved,
      language_id: languageId,
      parent_id: parentId,
    });

    setFormSubmitted(true);
  };

  const cancelHandler = () => {
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return <Redirect to="/tag" />;
  }
  let form = (
    <React.Fragment>
      <div className={styles.Input}>
        <label className={styles.Label}>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event?.target.value)}
        />
      </div>
      <div className={styles.Input}>
        <label className={styles.Label}>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(event) => setDescription(event?.target.value)}
        />
      </div>
      <div className={styles.Input}>
        <label className={styles.Label}>Is Active?</label>
        <input
          type="checkbox"
          name="is_active"
          checked={isActive}
          onChange={(event) => setIsActive(event?.target.checked)}
        />
      </div>
      <div className={styles.Input}>
        <label className={styles.Label}>Is Reserved?</label>
        <input
          type="checkbox"
          name="is_reserved"
          checked={isReserved}
          onChange={(event) => setIsReserved(event?.target.checked)}
        />
      </div>
      <div className={styles.Input}>
        <label className={styles.Label}>Language</label>
        <input
          type="number"
          name="language_id"
          value={languageId}
          onChange={(event) => setLanguageId(event?.target.value)}
        />
      </div>
      <div className={styles.Input}>
        <label className={styles.Label}>Parent</label>
        <input
          type="number"
          name="parent_id"
          value={parentId}
          onChange={(event) => setParentId(event?.target.value)}
        />
      </div>
      <ButtonElement color="primary" onClick={saveHandler}>
        Update
      </ButtonElement>
      &nbsp;
      <ButtonElement color="secondary" onClick={cancelHandler}>
        Cancel
      </ButtonElement>
    </React.Fragment>
  );
  return (
    <div className={styles.TagAdd}>
      <h4>Edit tag information</h4>
      {form}
    </div>
  );
};
