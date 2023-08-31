import { useRouter } from "next/dist/client/router";
import Card from '@/packages/card';
import Image from 'next/image'
import Content from '@/packages/content';
import { deal, deal_hosting } from '@/contants/detail';
import style from './index.module.scss'
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import custo from '@/assets/images/dsn/customer.png'
import min from '@/assets/images/dsn/miner.png'
import split from '@/assets/images/dsn/split.png'
import cloud from '@/assets/images/dsn/cloud.png'

import { formatDateTime, formatFilNum, isIndent, unitConversion } from "@/utils/utils";
import { get_account_type } from "@/contants/varible";

export default () => {
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "detail" });
    }
    return t(label, { ns: "detail" });
  };
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>({})
  useEffect(() => {
    if (id) {
      postAxios(apiUrl.detail_deal, { deal_id: Number(id) }).then((res:any) => {
        setData(res?.result?.deal_details)
      })
    }

  },[id])
  return <div>
    <Card title={deal.title} ns='detail' >
      <Content
        content={deal.list}
        data={data}
        ns={"detail"}
      />
    </Card>
    <Card title={deal_hosting.title} ns='detail'>
      <div className={style.hosting}>
        <div className={style.hosting_left}>
          <div className={style.hosting_main}>
            <span>{tr(deal.content.left_title)}</span>
            <Image className={style.hosting_img} src={custo} alt='' />
            {data.client_id &&<span>{get_account_type(undefined,data.client_id)}</span> }
          </div>

        </div>
        <div className={style.hosting_content}>
          <div className={style.hosting_main}>
            <span>
              <Image src={cloud} className={style.hosting_icon_img } alt=''></Image>
              { data?.piece_size && unitConversion( data.piece_size)}
            </span>
            <Image src={split} alt='' className={style.hosting_split} />
            <span>
              {formatDateTime(data.service_start_time)}
              <span style={{margin:'0px 6px'}}>
                { tr(deal.content.time)}
              </span>

              { formatDateTime(data.end_time)}
            </span>
            <span>
              {tr(deal.content?.cash)}:
              <span>
                { data?.storage_price_per_epoch&&formatFilNum(data?.storage_price_per_epoch)}
              </span>
            </span>
          </div>

        </div>
        <div className={style.hosting_right}>
          <div className={style.hosting_main}>
            <span>{tr(deal.content.right_title)}</span>
            <Image className={style.hosting_img} src={min} alt='' />
            {data.client_id &&<span>{get_account_type(undefined,data.provider_id)}</span> }
          </div>

        </div>
      </div>
    </Card>
  </div>
}