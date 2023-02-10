/** @format */

import { OPT_Value } from "@/types/index";
import styles from "./index.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface Props {
  options: Array<OPT_Value>;
  defaultValue?: string;
  value?: string;
  onChange?: (value: OPT_Value) => void;
  className?: string;
}

export default (props: Props) => {
  const { options, defaultValue, onChange, className, value } = props;
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (value || defaultValue) {
      const defaultItem = options.find(
        (v) => v.value === defaultValue || v.value === value
      );
      if (defaultItem) {
        setLabel(defaultItem?.label);
      }
    }
  }, [value, defaultValue]);

  const handleChange = (item: OPT_Value) => {
    setLabel(item.label);
    if (onChange) onChange(item);
  };
  return (
    <div className={`${styles.custom_select} ${className}`}>
      <div className={styles.custom_select_value}>
        {label}
        <DownOutlined />
      </div>
      <div className={styles.custom_select_contains}>
        <ul className={styles.custom_select_wrap}>
          {options.map((item) => {
            return (
              <li
                value={item.value}
                key={item.value}
                onClick={() => handleChange(item)}>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
