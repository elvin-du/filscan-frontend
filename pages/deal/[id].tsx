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
import { isIndent } from "@/utils/utils";
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
                    <span>{tr(deal.content.left_title)}</span>
                    <Image src={custo} alt='' />
                    {data.client_id &&<span>{get_account_type(undefined,data.client_id)}</span> }
                </div>
                <div className={style.hosting_content}></div>
                <div className={style.hosting_right}>
                    
                </div>
            </div>
        </Card>
    </div> 
}