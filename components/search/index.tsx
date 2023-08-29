/** @format */

import { useState } from "react";
import { search } from "@/contants/nav";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import styles from "./index.module.scss";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Router from "next/router"
import { getSvgIcon } from "@/svgUtils";
import Image from 'next/image'

export default () => {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');
  const [options, setOptions] = useState([]);
  const [active, setActive] = useState('')

  const handleSearch =() => {
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
        } else if (type === 'fns') {
          if (res?.result?.fns_tokens.length > 0) {
            setOptions(res?.result?.fns_tokens.map((v: any) => ({
              ...v, label: <span >
                <Image src={v.icon} alt='' width={45} height={45} className={'logo_img'}/>
                {`${v.name}`}</span>
              , value: v.provider
            })))
            setActive(type)
          } else {
            Router.push(`/domain/${showInput}`)
          }
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

  const handleClick = (item: any) => {
    setOptions([])
     Router.push(`/domain/${item.name}?provider=${item.value}`)
  }
  return (
    <div className={styles.search}>
      <Input
        bordered={false}
        className={`custom_input ${styles.search_input}`}
        placeholder={t(search.holder, { ns: "nav" }) || ""}
        onPressEnter={handleSearch}
        onChange={(e:any) => {
          setInput(e.target.value)
          setOptions([])
        }}
        suffix={<span className={styles.search_input_svg}
          onClick={handleSearch} >{getSvgIcon('searchIcon')}</span>}
      />
      { options && options.length > 0 &&
      <div className={styles.search_options}>
        <ul className={styles.search_options_ul}>
          {options.map((item:any) => {
            return <li key={item.value} className={styles.search_options_ul_li} onClick={ ()=>handleClick(item) }>
              { item.label}
            </li>
          })}
          </ul>
        </div>
      }
    </div>
  );
};
