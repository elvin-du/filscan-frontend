/** @format */

import { OPT_Value } from "@/types/index";
import styles from "./index.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  options: Array<OPT_Value>;
  defaultValue?: string;
  value?: string;
  onChange?: (value: OPT_Value) => void;
  className?: string;
  border?: boolean;
  ns?: string;
}

export default (props: Props) => {
  const { options, defaultValue, border, onChange, className, value, ns } =
    props;
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns });
  };

  const [label, setLabel] = useState("");

  useEffect(() => {
    if (value || defaultValue) {
      const defaultItem = options.find(
        (v) => v.value === defaultValue || v.value === value
      );
      if (defaultItem) {
        setLabel(ns ? tr(defaultItem?.label) : defaultItem?.label);
      }
    }
  }, [value, defaultValue]);

  const handleChange = (item: OPT_Value) => {
    setLabel(ns ? tr(item.label) : item.label);
    if (onChange) onChange(item);
  };
  return (
    <div
      className={`${styles.custom_select} ${className} ${
        border ? styles.border_select : ""
      }`}>
      <div className={`${styles.custom_select_value} `}>
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
                {ns ? tr(item.label) : item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
