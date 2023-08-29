/** @format */
import { Table } from "antd";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { isMobile } from "@/utils/utils";

export default ({
  dataSource,
  columns,
  current,
  onPage,
  className,
  onChange,
  loading,
  total = 0,
  rowKey,
}: {
  onChange?: Function;
  className?: string
  dataSource: Array<any>;
  columns: ColumnsType<any> | any;
  current?: number;
  total?: number;
  rowKey?: string | any,
  loading?: boolean
  onPage?: (cur: number, pageSize?: number) => void;
}) => {
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
          {columns.map((item: any,itemIndex:number) => {
            const { title, dataIndex,render } = item;
            const showTitle = typeof item.title === 'function' ? item.title() : item.title;
            let showValue = dataSource[dataIndex]
            if (render) {
              showValue= render(dataSource[dataIndex],dataSource,index)
            }
            return <div className="mobile_table_card_item" key={itemIndex}>
              <div className="mobile_table_card_item_label">{showTitle}</div>
              <div className="mobile_table_card_item_value">{showValue}</div>
            </div>
          })}
        </div>
      })}
    </div>

  }

  return (
    <Table
      className={`custom-table custom-border-table ${className}`}
      dataSource={[...data]}
      columns={columns}
      rowKey={rowKey}
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
  );
};
