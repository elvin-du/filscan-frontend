import { useTranslation } from "react-i18next";
import style from './style.module.scss';

export default ({ list,data }: { list: any,data:Record<string,any> }) => { 
     const { t } = useTranslation();
    const tr = (label: string): string => {
        return t(label, { ns: "detail" });
    };
    return <div className={style.power_content}>
        <div className={style.power_content_header}>
            {list?.header?.map((item:any) => { 
                return <div className={ style.power_content_header_item}>
                    <div>{tr(item.label)}</div>
                    <div className={style.power_content_value}>{data[item.dataIndex]}</div>
                </div>
            })}
        </div>
        <div className={ style.power_content_content}>
            {list?.content?.map((item: any, index: number) => { 
                let value = data[item.dataIndex];
                if (item.renderList) { 
                    value = <>
                        {item.renderList.map((listItem:any )=> { 
                            return <span style={{color:listItem.color}}>
                             <span>{data[listItem.value]}</span>
                            <span className={ style.power_content_value}>{tr(listItem.label)}</span>
                        </span>
                    })}
                   </> 
                }
                return <div className={style.power_content_content_item} style={{ width: item?.width }}>
                    <span>{tr(item.label)}</span>
                    <span className={`${item.renderList ? style.power_content_listValue : style.power_content_value}`} style={{justifyContent:index%2 ? 'end':'start'}} >{value}</span>
                </div>
            })}
        </div>
    </div>
}