import { verify } from "@/contants/contract"
import { getSvgIcon } from "@/svgUtils";
import { useTranslation } from "react-i18next";
import Main from '@/packages/main'
import styles from './index.module.scss'
export default ({ data = {} }: {data:any}) => { 
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
                {getSvgIcon(data?.is_verified ?'successIcon': 'errorIcon')}
                <span style={{color:data?.is_verified?'green':'red'}}>{data?.is_verified ? tr('ver_sucess'):tr('ver_err') }</span>
            </span>
            <div className={ styles.output_content_des}></div>
        </div>
         <span className={styles.output_br} />
        <div  className={ styles.output_content}>
         <Main content={verify.output.params} ns='contract' data={{} }/>
        </div>
        <span className={styles.output_br} />
        <div className={styles.output_other}>
           
                <div className={`${styles.output_content} ${styles.output_borderContent}`}>
                        {verify.output.others.map((item:any) => { 
                        return <div>
                        <div className={ styles.output_content_title}>
                                {tr(item.title)}
                        </div>
                            <div className={styles.output_content_des}>
                            { data[item.dataIndex]}
                        </div>
                    </div>
        })}
                </div>
        
          
        </div>
      
       
    </div>
}