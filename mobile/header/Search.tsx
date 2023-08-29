/** @format */

import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { search } from "@/contants/nav";
import { Input } from "antd";
import styles from "./index.module.scss";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Router from "next/router"

export default () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');

  const handleSearch = () => {
    postAxios(apiUrl.searchInfo, {
      input,
      input_type:select
    }).then((res:any) => {
      const result = res?.result?.search_result.result || {};
      const type = res?.result?.search_result?.result_type;
      if (type) {
          if (type === 'owner') {
        //owner
        Router.push(`/owner/${input}`);
      } else if (type === 'basic') {
         Router.push( `/address/${input}`)
      }
      }

    })
  }
  return (
    <div className={styles.mobile_search}>
      <Input
        bordered={false}
        className='custom_input'
        placeholder={t(search.holder, { ns: "nav" }) || ""}
        onPressEnter={handleSearch}
        onChange={(e:any) => {setInput(e.target.value) } }
        suffix={<SearchOutlined className='antd-icon' onClick={handleSearch} rev={undefined}/>}
      />
    </div>
  );
};
