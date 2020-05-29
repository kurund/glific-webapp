import React, { useState } from "react";
import {
    TextField,
} from "@material-ui/core";

import styles from "./TagAdd.module.css";
interface TagEntryProps {
    name: string,
    error: boolean,
    value: string | number,
    type: string,
    errorMsg: string,
    callBack: Function,
}

export const TagEntry: React.SFC<TagEntryProps> = (props: TagEntryProps) => {
    return (
        <div style={{ height: '80px' }} className={styles.Input}>
            <label className={styles.Label}>{props.name}</label>
            <TextField
                required
                error={props.error && (props.value == "" || +props.value < 0)} // < 0 case for ID entries
                defaultValue={props.value}
                InputLabelProps={{ shrink: true, }}
                label={props.name}
                type={props.type}
                helperText={props.error && (props.value == "" || +props.value < 0) ? props.errorMsg : ""} // < 0 case for ID entries
                onChange={(event) => props.callBack(event?.target.value)}
            />
        </div>
    )
}