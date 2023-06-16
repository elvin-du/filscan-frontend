import { verify } from "@/contants/contract"
import { getSvgIcon } from "@/svgUtils";
import { useTranslation } from "react-i18next";
import Main from '@/packages/main'
import styles from './index.module.scss'
import { Button } from "antd";
import  Router  from "next/router";


const btns = [
    { text: 'look_adres', value: 'look_adres',  className: 'active_btn' },
        {text:'gohome',value:'gohome',  className: 'custom_border_btn'}

]

const bakBtn = [
    { text: 'reset_ver', value: 'reset_ver' ,className: 'active_btn'},
    { text: 'back', value: 'back', className: 'custom_border_btn' },

]

export default ({ data = {}, onChange }: { data: any, onChange: () => void}) => { 
      const { t } = useTranslation();
    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };
    return <div className={styles.output}>
            <div className={ styles.output_content}>
            <div className={ styles.output_content_title}>
            {tr(verify.output.title)}
            </div>
            <span className={ styles.output_content_icon}>
                {getSvgIcon(data?.is_verified && !data?.has_been_verified ?'successIcon': 'errorIcon')}
                <span style={{color:data?.is_verified && !data?.has_been_verified  ?'#059b02':'#e11919'}}>{data?.has_been_verified ? tr('has_been_verified'):data?.is_verified ? tr('ver_sucess'):tr('ver_err') }</span>
            </span>
            <div className={styles.output_content_des}>
                {data.byte_code}
            </div>
        </div>
         <span className={styles.output_br} />
        <div  className={ styles.output_content}>
         <Main content={verify.output.params} ns='contract' data={data}/>
        </div>
        <span className={styles.output_br} />
        {!data?.has_been_verified &&  
          <div className={styles.output_other}>
                <div className={`${styles.output_content} ${styles.output_borderContent}`}>
                        {verify.output.others.map((item:any) => { 
                        return <div>
                        <div className={ styles.output_content_title} >
                                {tr(item.title)}
                        </div>
                            <div className={styles.output_content_des}>
                            { data[item.dataIndex]}
                        </div>
                    </div>
        })}
                </div>
        
          
        </div>}
        <div className={ styles.output_content_btns}>
          {(data?.is_verified ?btns:bakBtn).map((btn:any,index:number) => { 
            return <Button key={index}
                            className={btn.className}
                onClick={() => { 
                    if (btn.value === 'look_adres') {
                        Router.push(`/address/${data.contract_address}`)
                    } else if (btn.value === 'gohome') {
                        Router.push(`/home`)
                    } else if (btn.value === 'reset_ver') { 
                        onChange()
                    }
                                
            }}>{tr(btn.text)}</Button>
        })}
        </div>
      
       
    </div>
}