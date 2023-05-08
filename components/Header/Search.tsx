/** @format */

import { useContext, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { search } from "@/contants/nav";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import Select from "@/packages/selects";
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
      const type = res?.result?.result_type;
      if (type) {
        if (type === 'owner') {
          //owner 
          Router.push(`/owner/${input}`);
        } else if (type === 'account') {
          Router.push(`/address/${input}`)
        } else if (type === 'height') {
          Router.push(`/tipset/chain?height=${input}`)
        } else if (type === 'message_details') {
          Router.push(`/message/${input}`)
        } else if (type === 'miner') {
          Router.push(`/miner/${input}`)
        }
      } else { 
        //404
         Router.push(`/noResult/${input}`)
      }
    
    })
  }
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
        onChange={(item:any) => { 
          setSelect(item.value)
        }}
      />
     
      <Input
        bordered={false}
        className='custom_input'
        placeholder={t(search.holder, { ns: "nav" }) || ""}
        onPressEnter={handleSearch}
        onChange={(e) => {setInput(e.target.value) } }
        suffix={<SearchOutlined className='antd-icon' onClick={handleSearch }/>}
      />
    </div>
  );
};
