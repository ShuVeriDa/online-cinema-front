import {forwardRef} from 'react';
import {IField} from "@/ui/form-elements/form.interface";

import styles from './form.module.scss';
import cn from "classnames";


export const Field = forwardRef<HTMLInputElement, IField>((
  {
    placeholder, error, type = 'text', style, ...rest
  }, ref) => {
  return (
    <div className={cn(styles.common, styles.field)} style={style}>
      <label>
        <span>{placeholder}</span>
        <input type={type} ref={ref} {...rest}/>
      </label>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
})

Field.displayName = "Field"