/** @format */

import { getSvgIcon } from "@/svgUtils";
import styles from "./index.module.scss";
export default (props: { context: string }) => {
  const { context } = props;
  return (
    <div className={styles.tip}>
      {getSvgIcon("tip")}
      <div className={styles.tip_context}>{context}</div>
    </div>
  );
};
