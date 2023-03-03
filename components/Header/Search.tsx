/** @format */

import { useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { search } from "@/contants/nav";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import Select from "@/packages/selects";
import styles from "./index.module.scss";

export default () => {
  const { t, i18n } = useTranslation();
  //   const options = useMemo(() => {
  //     return search.opt.map((item) => {
  //       return { ...item, label: t(item.label, { ns: "nav" }) };
  //     });
  //   }, []);
  return (
    <div className={styles.search}>
      <Select
        key='search'
        className={styles.search_select}
        warpClass={styles.search_select_wrap}
        valueClass={styles.search_select_value}
        defaultValue={"all"}
        options={search.opt}
        ns={"nav"}
      />
      <Input
        bordered={false}
        className='custom_input'
        placeholder={t(search.holder, { ns: "nav" }) || ""}
        suffix={<SearchOutlined className='antd-icon' />}
      />
    </div>
  );
};
