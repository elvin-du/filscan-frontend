import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { domain_name_catd } from "@/contants/domain";
import Card from '@/packages/custom_card'
import Link from 'next/link'
import style from './index.module.scss'

export default () => {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "domain" });
    }
    return t(label, { ns: "domain" });
  };

  const [address,type] = useMemo(() => {
    const new_owner = router.query?.name || '';
    const new_type = router.query?.type ||''
    return [new_owner,new_type]
  }, [router.query])

  useEffect(() => {
    // domain detail
    if (address) {
      postAxios(apiUrl.contract_domain_address, {
        address: address,
        type,
      }).then(
        (res: any) => {
          setData(res?.result);
        }
      );
    }

  }, [address])

  return <div>
    <Card title={`${tr('Result_for')}: ${address}`} ns='domain'>
      <span></span>
      {/* <Main content={domain_name_catd.content} data={data}  ns='domain'/> */}
    </Card>

    {data?.domains && data?.domains.length > 0 && <Card ns='domain'
      className={ style.domains_wrap}
      header={<span className={ style.domains_wrap_header}>
        <span>{ tr('allDomains',{ value:  data?.domains.length })}</span>
      </span>}>
      {data?.domains.map((item:any,index:number) => {
        return <div className={style.domains_wrap_item} key={index}>
          { item.logo &&<Image width={45} height={45} className='logo_img' src={item.logo} alt=''/> }

          <Link key={item} className='link' href={`/domain/${item.domain}?provider=${item.provider}`}>{item.domain ||''}</Link>
        </div>

      })}
    </Card>}

  </div>
}