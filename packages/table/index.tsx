/** @format */
import { Table } from "antd";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";

export default ({
  dataSource,
  columns,
  current,
  onPage,
  onChange,
  total = 0,
  rowKey,
}: {
    onChange?: Function;
  dataSource: Array<any>;
  columns: ColumnsType<any> | any;
  current?: number;
  total: number;
  rowKey?:string|any,
  onPage?: (cur: number, pageSize?: number) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
     setData(dataSource);
    if (dataSource.length > 0) {
      setLoading(false)
    } else { 
      setTimeout(() => {
        setLoading(false)
       },3000)
    }
    
  }, [dataSource]);

  return (
    <Table
      className='custom-table custom-border-table'
      dataSource={data}
      columns={columns}
      rowKey={ rowKey}
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
                  setLoading(true);
                  onPage(cur);
                }
              },
            }
          : false
      }
    />
  );
};
