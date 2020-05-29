import React, { useState } from "react";
import {
    Checkbox,
} from "@material-ui/core";

import styles from "./TagCheckbox.module.css";

interface TagCheckboxProps {
    name: string,
    value: boolean,
    callBack: Function,
}

export const TagCheckbox: React.SFC<TagCheckboxProps> = (props: TagCheckboxProps) => {
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.name}</label>
            <Checkbox
                checked={props.value}
                onChange={(event) => props.callBack(event?.target.checked)}
            />
        </div>
    )
}