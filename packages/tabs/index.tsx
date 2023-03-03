/** @format */
import { OPT_Value } from "@/types";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
interface Props {
  data: Array<OPT_Value>;
  ns: string;
  defaultValue?: string;
  border?: boolean;
  className?: string;
  onChange?: (item: OPT_Value) => void;
}
export default (props: Props) => {
  const { data, onChange, className, border, ns, defaultValue = "" } = props;
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns });
  };
  const [active, setActive] = useState(defaultValue);

  useEffect(() => {
    setActive(defaultValue);
  }, [defaultValue]);

  console.log("====3data", data);
  return (
    <div className={`default-tabs ${border ? "border-tabs" : ""} ${className}`}>
      {data.map((item: OPT_Value) => {
        return (
          <div
            key={item.value}
            className={`tabs-item ${active === item.value ? "tab-active" : ""}`}
            onClick={() => {
              setActive(item.value);
              if (onChange) onChange(item);
            }}>
            {tr(item.label)}
          </div>
        );
      })}
    </div>
  );
};
