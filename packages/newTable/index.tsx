/** @format */
import { Table } from "antd";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import style from './index.module.scss'
import { isMobile } from "@/utils/utils";
export default ({
    total_msg,  
    ns,
  dataSource,
  columns,
  current,
  onPage,
  wrapClassName,
  className,
  onChange,
  loading,
  total = 0,
  rowKey,
}: {
  ns?:string
  total_msg?:string
  onChange?: Function;
  wrapClassName?:string
  className?: string
  dataSource: Array<any>;
  columns: ColumnsType<any> | any;
  current?: number;
  total?: number;
  rowKey?: string | any,
  loading?: boolean
  onPage?: (cur: number, pageSize?: number) => void;
    }) => {
    const { t } = useTranslation();
      const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns });
        }
        return t(label, { ns });
    };
    
  const [data, setData] = useState<Array<any>>([]);


  useEffect(() => {
    if (loading) {
      setData([])
    } else {
      setData(dataSource)
    }
  }, [dataSource, loading]);


    if (isMobile()) { 
    return <div className="mobile_table">
      {data.map((dataSource,index) => { 
        return <div className="mobile_table_card" key={ index}>
          {columns.map((item: any,index:number) => { 
            const { title, dataIndex,render } = item;
            const showTitle = typeof item.title === 'function' ? item.title() : item.title;
            let showValue = dataSource[dataIndex]
            if (render) { 
              showValue= render(dataSource[dataIndex],dataSource,index)
            }
            return <div className="mobile_table_card_item" key={ index}>
              <div className="mobile_table_card_item_label">{showTitle}</div>
              <div className="mobile_table_card_item_value">{showValue}</div>
            </div>
          })}
        </div>
      })}
    </div>



  }


    return (
        <div className={`${style.table_content} ${wrapClassName}`}>
          {total_msg && <div className={style.table_content_total}>{tr(total_msg,{ value: total }) }</div>   }
        <Table
      className={`custom-table ${style.table_content_table} ${total_msg ?'':'no_height_border_table'} ${className}`}
      dataSource={[...data]}
      columns={columns}
        rowKey={rowKey || `${new Date().getTime()}`}
      loading={loading}
      onChange={(pagination, filters, sorter,) => { if (onChange) onChange(pagination, filters, sorter,) }}
      pagination={
        total > pageLimit
          ? {
              position: ["bottomCenter"],
              current: current,
              showQuickJumper: true,
              pageSize: pageLimit,
              showSizeChanger: false,
              total,
              onChange: (cur) => {
                if (onPage) {
                  onPage(cur);
                }
              },
            }
          : false
      }
    />
      </div>
   
  );
};
