/** @format */

import { Item } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Style from "./index.module.scss";

interface Props {
  options: Array<Item>;
  lang: string;
}

function Menu(props: Props) {
  const { t, i18n } = useTranslation();

  const { options, lang } = props;
  const [value, setValue] = useState("");

  return (
    <div className={Style["menu-select"]}>
      <div>{value}</div>
      <ul>
        {options.map((item: Item) => {
          return <li key={item.value}>{t(item.key, { ns: lang })}</li>;
        })}
      </ul>
    </div>
  );
}

export default Menu;
