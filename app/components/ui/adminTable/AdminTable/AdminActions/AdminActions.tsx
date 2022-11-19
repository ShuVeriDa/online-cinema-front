import {FC} from 'react';
import {useRouter} from "next/router";

import styles from './AdminActions.module.scss';
import {MaterialIcon} from "@/ui/MaterialIcon";

interface IAdminActionsProps {
  editUrl: string
  removeHandler: () => void
}

export const AdminActions: FC<IAdminActionsProps> = ({editUrl, removeHandler}) => {
  const {push} = useRouter()
  return (
    <div className={styles.actions}>
      <button onClick={() => push(editUrl)}>
        <MaterialIcon name={'MdEdit'} />
      </button>
      <button onClick={removeHandler}>
        <MaterialIcon name={'MdClose'} />
      </button>
    </div>
  );
};