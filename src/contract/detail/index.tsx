import { verify_tabs } from "@/contants/contract";
import Tabs from "@/packages/tabs";
import style from './index.module.scss'
import { useState } from "react";
import Verify from './verify';
import dynamic from "next/dynamic";

const Read = dynamic(() => import('./Read'), { ssr: false });

export default ({ id ,verifyData}: { id?: string | string[] ,verifyData?:Record<string,any> }) => { 
    const [active, setActive] = useState('Verify_code');


    const handleChange = (type:string,item:any) => { 
        setActive(item.value)
    }    
    return <div className={style.contract_wrap}>
        <Tabs
        border
        data={verify_tabs}
        ns='contract'
        defaultValue={active}
        onChange={(value) => handleChange("active", value)} />
        {active === 'Verify_code' && <Verify verifyData={verifyData} id={id} />}
        {active === 'Verify_read' && <Read verifyData={verifyData} type={'view'} id={ id}/>}
        {active === 'Verify_write' && <Read verifyData={verifyData} type={'write'} id={ id}/>}

    </div>

}
