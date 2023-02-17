/** @format */
import { OPT_Value } from "@/types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
interface Props {
  data: Array<OPT_Value>;
  ns: string;
  border?: boolean;
  onChange: (item: OPT_Value) => void;
}
export default (props: Props) => {
  const { data, onChange, border, ns } = props;
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns });
  };
  const [active, setActive] = useState("");

  return (
    <div className={`default-tabs ${border ? "border-tabs" : ""}`}>
      {data.map((item: OPT_Value) => {
        return (
          <div
            key={item.value}
            className={`tabs-item ${active === item.value ? "tab-active" : ""}`}
            onClick={() => {
              setActive(item.value);
              onChange(item);
            }}>
            {tr(item.label)}
          </div>
        );
      })}
    </div>
  );
};
