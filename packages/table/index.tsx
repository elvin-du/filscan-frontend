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
}: {
  dataSouce: Array<any>;
  columns: ColumnsType<any>;
  current?: number;
  total: number;
  onPage?: (cur: number) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    if (dataSouce.length > 0) {
      setData(dataSouce);
      setLoading(false);
    }
  }, [dataSouce]);

  return (
    <Table
      className='custom-table custom-border-table'
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={
        total > pageLimit
          ? {
              position: ["bottomCenter"],
              current: current,
              showQuickJumper: true,
              total,
              onChange: (cur) => {
                if (onPage) onPage(cur);
              },
            }
          : false
      }
    />
  );
};
