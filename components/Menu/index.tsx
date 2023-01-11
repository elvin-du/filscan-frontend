/** @format */

import { Item } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./index.module.scss";
import { DownOutlined } from "@ant-design/icons";
interface Props {
  options: Array<Item>;
  lang: string;
  showValue?: string; //是否显示选中当前的值
}

function Menu(props: Props) {
  const { t, i18n } = useTranslation();
  const { options, lang, showValue } = props;
  const [value, setValue] = useState("");
  //className={style.menuSelect}
  return (
    <div className={style["menu-select"]}>
      {showValue ? (
        <div>
          {t(showValue, { ns: lang })} <DownOutlined />
        </div>
      ) : (
        <div>{value}</div>
      )}

      <ul className={style["menu-select-wrap"]}>
        {options.map((item: Item) => {
          return <li key={item.path}>{t(item.key, { ns: lang })}</li>;
        })}
      </ul>
    </div>
  );
}

export default Menu;
