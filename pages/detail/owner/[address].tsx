/** @format */

import { detail_owner, detail_owner_overview } from "@/contants/detail";
import { useTranslation } from "react-i18next";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { getShowData } from "@/utils/utils";
import { useRouter } from "next/router";
import Card from "@/packages/card";
import Overview from "./View";
import styles from "./index.module.scss";

export default () => {
  const router = useRouter();
  const { address } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (address) {
      postAxios(apiUrl.detail_owne, { account_id: address }).then(
        (res: any) => {
          setData(res?.result?.account_info);
        }
      );
    }
  }, [address]);

  console.log("====44", data, address);

  return (
    <div className={styles.owner}>
      <Card title={detail_owner.title} ns='detail'>
        <ul className={styles.owner_content}>
          {detail_owner.content.map((item) => {
            let showData = getShowData(item, data);
            return (
              <li className={styles.owner_content_item}>
                <span className={styles.owner_content_item_label}>
                  {tr(item.label)} :
                </span>
                <span className={styles.owner_content_item_value}>
                  {(showData && showData[item.dataIndex]) || "--"}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
      <Card title={detail_owner_overview.title} ns='detail'>
        <div className={styles.overview}>
          <div className={styles.overview_chart}>
            <div className={styles.overview_chart_balance}>
              <div>{tr(detail_owner_overview.list.title)}</div>
              <div className='font-20'>
                {data?.account_ore_pool?.account_ore?.balance
                  ? `${Number(
                      data?.account_ore_pool?.account_ore?.balance
                    ).toFixed(4)} FIL`
                  : "1,623,367.4871 FIL"}
              </div>
            </div>
            <Overview data={data} />
          </div>

          <div className={styles.overview_power}></div>
        </div>
      </Card>
    </div>
  );
};
