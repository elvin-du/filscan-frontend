import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Main from '@/packages/main';
import {  domain_name_catd } from "@/contants/domain";
import Card from '@/packages/custom_card'

export default () => { 
    const router = useRouter();
    const [data, setData] = useState({});
    
      const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "contract" });
        }
        return t(label, { ns: "contract" });
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
            domain: owner,
            provider:provider
        }).then(
            (res: any) => {
          setData(res?.result);
        }
      );
        }

     }, [owner])
    
    
    return <Card title={`Result for: ${owner}`} ns='domain'>
        <Main content={domain_name_catd.content} data={data}  ns='domain'/>
    </Card>
}