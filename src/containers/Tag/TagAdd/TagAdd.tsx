import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "./TagAdd.module.css";
import ButtonElement from "../../../components/UI/Button/ButtonElement";
import { useActions } from "../../../store/actions";
import * as TagActions from "../../../store/actions/tag";
import { Tag } from "../../../model";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface TagAddProps {
  match: any;
}

const GET_TAG = gql`
  query getTag($id: ID!) {
    tag(id: $id) {
      tag {
        id
        label
        description
        isActive
        isReserved
        language {
          id
        }
      }
    }
  }
`;

const UPDATE_TAG = gql`
  mutation updateTag($id:ID!, $input:TagInput!) {
    updateTag(id: $id, input: $input) {
      tag {
        id
        label
        language {
          id
          label
        }
        description
      }
      errors {
        key
        message
      }
    }
  }
`;

export const TagAdd: React.SFC<TagAddProps> = (props: TagAddProps) => {
  const tagId = props.match ? props.match.params.id : null;
  const { loading, error, data } = useQuery(GET_TAG, {
    variables: { id: tagId },
  });
  const [updateTag] = useMutation(UPDATE_TAG);

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [languageId, setLanguageId] = useState("");
  const [parentId, setParentId] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // const tagActions = useActions(TagActions);

  useEffect(() => {
    if (tag) {
      setLabel(tag.label);
      setDescription(tag.description);
      setIsActive(tag.isActive);
      setIsReserved(tag.isReserved);
      setLanguageId(tag.language.id);
      setParentId(tag.parent_id);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const tag = data.tag.tag;

  const saveHandler = () => {
    const payload = {
      label: label,
      description: description,
      is_active: isActive,
      is_reserved: isReserved,
      language_id: Number(languageId),
      // parent_id: Number(parentId),
    };

    if (tag) {
      // tagActions.editTag(payload);
      updateTag({
        variables: {
          id: tagId,
          input: payload,
        }
      });
    } else {
      // tagActions.addTag(payload);
    }

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
        <label className={styles.Label}>Label</label>
        <input
          type="text"
          name="label"
          value={label}
          onChange={(event) => setLabel(event?.target.value)}
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
        Save
			</ButtonElement>
			&nbsp;
      <ButtonElement color="secondary" onClick={cancelHandler}>
        Cancel
			</ButtonElement>
    </React.Fragment>
  );

  return (
    <div className={styles.TagAdd}>
      <h4>{tag ? "Edit tag information" : "Enter tag information"}</h4>
      {form}
    </div>
  );
};
