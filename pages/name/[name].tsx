import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Main from '@/packages/main';
import {  domain_name_catd } from "@/contants/domain";
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

  const [owner,provider] = useMemo(() => { 
    const new_owner = router.query?.name || '';
    const new_provider = router.query?.provider ||''
    return [new_owner,new_provider]
  }, [router.query])
    
    
    
    useEffect(() => {
        // domain detail
        if (owner) { 
          postAxios(apiUrl.contract_domain_owner, {
            controller: owner,
            provider:provider
        }).then(
            (res: any) => {
          setData(res?.result);
        }
      );
        }

     }, [owner])
    
    
  return <div>
    <Card title={`Result for: ${owner}`} ns='domain'>
      <span></span>
        {/* <Main content={domain_name_catd.content} data={data}  ns='domain'/> */}
    </Card>
  
    {data?.domains && data?.domains.length > 0 && <Card ns='domain'
      className={ style.domains_wrap}
      header={<span   className={ style.domains_wrap_header}>
      <span>{ tr('allDomains',{ value:  data?.domains.length })}</span>
    </span>}>
        {data?.domains.map((item:string) => { 
          return <div className={style.domains_wrap_item} >
            <Link key={item} className='link' href={`/domain/${item}`}>{item}</Link>
            </div>
          
        })}
    </Card>}
    
    </div>  
}