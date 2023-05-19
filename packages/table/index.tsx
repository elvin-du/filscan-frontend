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
