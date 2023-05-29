/** @format */

import { useState } from "react";
import { search } from "@/contants/nav";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import Select from "@/packages/selects";
import styles from "./index.module.scss";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Router from "next/router"
import { getSvgIcon } from "@/svgUtils";

export default () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');

  const handleSearch = () => { 
    const showInput = input.trim();
    if (input) { 
         postAxios(apiUrl.searchInfo, {
      input:showInput,
      input_type:select
    }).then((res:any) => { 
      const type = res?.result?.result_type;
      if (type) {
        if (type === 'owner') {
          //owner 
          Router.push(`/owner/${showInput}`);
        } else if (type === 'address') {
          Router.push(`/address/${showInput}`)
        } else if (type === 'height') {
          Router.push(`/tipset/chain?height=${showInput}`)
        } else if (type === 'message_details') {
          Router.push(`/message/${showInput}`)
        } else if (type === 'miner') {
          Router.push(`/miner/${showInput}`)
        } else if (type === 'block_details') { 
          Router.push(`/tipset/chain?cid=${showInput}`)
        } else {
          Router.push(`/address/${showInput}`)
        }
      } else { 
        //404
         Router.push(`/noResult/${showInput}`)
      }
    
    })
    }
   
  }
  return (
    <div className={styles.search}>
      {/* <Select
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
      /> */}
     
      <Input
        bordered={false}
        className={`custom_input ${styles.search_input}`}
        placeholder={t(search.holder, { ns: "nav" }) || ""}
        onPressEnter={handleSearch}
        onChange={(e) => {setInput(e.target.value) } }
        suffix={ <span className={styles.search_input_svg} onClick={handleSearch } >{getSvgIcon('searchIcon')}</span>}
      />
    </div>
  );
};
