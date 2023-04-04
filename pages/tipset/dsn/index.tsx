/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { dsn_list, dsn_columns } from "@/contants/tipset";
import { Input } from "antd";
import Table from "@/packages/table";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import styles from "../index.module.scss";
import { pageLimit } from "@/contants/varible";

export default () => {
  const filscanStore: any = useContext(FilscanState);

  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({
    total: 0,
    dataSource: [],
  });

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_Dsn, {
      filters: {
        index: current - 1,
        limit:20
      }
    }).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSource: res?.result.market_deals_list || [],
      });
    });
  };

  const columns = useMemo(() => {
    return dsn_columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore.filscan.lang]);

  return (
    <div className={styles.message_list}>
      <h3>{tr(dsn_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(dsn_list.total_list, { value: data.total })}</div>
        <Input.Search
          className='custom-input-search'
          placeholder={tr(dsn_list.placeholder)}
        />
      </div>
      <Table
          columns={columns}
          total={data.total}
          dataSource={[...data.dataSource] }
          current={current}
          rowKey={(record: any) => `${record.piece_cid}_${record.end_time}`}
         // onChange={handleTableChange}
          onPage={(cur: number) => {
            setCurrent(cur);
            //load(active, cur);
          }}


        // className='custom-table custom-border-table'
        // dataSource={data.dataSource}
        // columns={columns}
        // pagination={{
        //   position: ["bottomCenter"],
        //   current: current,
        //   showQuickJumper: true,
        //   total: data.total,
        //   onChange: (cur) => {
        //     setCurrent(cur);
        //   },
        // }}
      />
    </div>
  );
};
