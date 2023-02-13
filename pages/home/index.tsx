/** @format */

import { home_meta } from "@/contants/home";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import axios from "axios";
import { postAxios, baseApi } from "@/store/server";
function Home() {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const { title, list } = home_meta;

  const tr = (label: string) => {
    return t(label, { ns: "home" });
  };
  console.log("---3", list);
  return (
    <div className='default-card'>
      <h5>
        {tr(title.label)}
        <span></span>
      </h5>
      <ul className={styles.ul_list}>
        {list.map((item) => {
          return (
            <div className={styles.list_item} key={item.label}>
              {tr(item.label)}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps(context: any) {
  //let result = await postAxios(`${baseApi}/TotalIndicators`, {});
  let result = await axios
    .post("http://192.168.1.189:17000/api/v1/TotalIndicators")
    .then((res) => {
      console.log("---3-33", res);
    });
  console.log("result===3", result);

  return {
    props: {
      data: null,
    },
  };
}

export default Home;
