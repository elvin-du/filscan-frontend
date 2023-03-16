/** @format */
import { Table } from "antd";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";

export default ({
  dataSouce,
  columns,
  current,
  onPage,
  total = 0,
  rowKey,
}: {
  dataSouce: Array<any>;
  columns: ColumnsType<any>;
  current?: number;
  total: number;
  rowKey?:string|any,
  onPage?: (cur: number, pageSize?: number) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
     setData(dataSouce);
    if (dataSouce.length > 0) {
      setLoading(false)
    } else { 
      setTimeout(() => {
        setLoading(false)
       },1000)
    }
    
  }, [dataSouce]);

  return (
    <Table
      className='custom-table custom-border-table'
      dataSource={data}
      columns={columns}
      rowKey={ rowKey}
      loading={loading}
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
