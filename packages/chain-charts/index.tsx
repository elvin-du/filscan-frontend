/** @format */

import styles from "./index.module.scss";
interface Props {
  data: Array<any>;
}

export default (props: Props) => {
  const { data } = props;
  return (
    <div className={styles.tipset_list}>
      {data.map((item) => {
        return (
          <div className={styles.tipset_list_item}>
            <span className='icon-arrow-right'></span>
            <div className={styles.item}>{item?.parent_base_fee}</div>
          </div>
        );
      })}
    </div>
  );
};
