import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Main from '@/packages/main';
import { domain_card } from "@/contants/domain";
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

  const [domain,provider] = useMemo(() => { 
    const new_domain = router.query?.domain || '';
    const new_provider = router.query?.provider ||'';
    return [new_domain,new_provider]
  }, [router.query])
    
    
    
    useEffect(() => {
        // domain detail
        if (domain) { 
        postAxios(apiUrl.contract_domain, {
          domain: domain,
          provider:provider
        }).then(
            (res: any) => {
            setData({...res?.result,provider:provider});
        }
      );
        }

     }, [domain])
    
    
    return <Card title={`Result for: ${domain}`} ns='domain'>
        <Main content={domain_card.content} data={data} ns='domain' border/>
    </Card>
}