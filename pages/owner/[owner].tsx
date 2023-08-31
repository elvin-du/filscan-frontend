/** @format */

import { detail_owner,pool_overview } from "@/contants/detail";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useRouter } from "next/router";
import Card from "@/packages/custom_card";
import Main from "@/packages/main";
import styles from "../index.module.scss";
import PoolOverView from '@/src/detail/poolOverview'
import IndicatorsView from '@/src/detail/IndicatorsView'
import TrendView from '@/src/detail/trendView'

export default () => {
  const router = useRouter();
  const { owner } = router.query;
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (owner) {
      postAxios(apiUrl.detail_owner, {
        owner_id: owner}).then(
        (res: any) => {
          setData(res?.result?.account_owner);
        }
      );
    }

  }, [owner]);

  return (
    <div className={styles.owner}>
      <PoolOverView type='owner' title={pool_overview.title} data={data} />

      <Card title={detail_owner.title.label} bgColor ns='detail'>
        <Main
          content={detail_owner.content}
          data={data}
          ns={"detail"}
        />

      </Card>
      <IndicatorsView accountId={owner} />
      <TrendView accountId={owner} type='owner'/>
    </div>
  );
};
