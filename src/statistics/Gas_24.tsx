/** @format */
import Card from "@/packages/card";
import { apiUrl } from "@/contants/apiUrl";
import { gas_24 } from "@/contants/statistic";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { postAxios } from "@/store/server";
import { Table } from "antd";

export default () => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };

  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    postAxios(apiUrl.static_gas_24).then((res: any) => {
      setData(res?.result.items);
    });
  }, []);

  const columns: any = useMemo(() => {
    return gas_24.columns.map((item: any) => {
      return { ...item,align:'center', title: tr(item.title) };
    });
  }, []);

  return (
    <Card title={gas_24.title} ns='static'>
      <Table
        className='custom-table'
        dataSource={data}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          current: current,
          showQuickJumper: true,
          total: 20,
          onChange: (cur) => {
            setCurrent(cur);
          },
        }}
      />
    </Card>
  );
};
