/** @format */
import styles from "../index.module.scss";
import Tabs from "@/packages/tabs";
import Table from "@/packages/table";
import { miner_list } from "@/contants/detail";
import { useTranslation } from "react-i18next";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect, useMemo, useContext } from "react";

export default ({ miner }: { miner: any }) => {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "detail" });
    }
    return t(label, { ns: "detail" });
  };
  const [data, setData] = useState({
    total: 0,
    dataSouce: [],
  });
  const [active, setActive] = useState({
    label: "message_list",
    value: "MessagesByAccountID",
  });
  const [current, setCurrent] = useState(0);

  const columns = useMemo(() => {
    return miner_list.columns(active.value).map((v) => {
      const newObj = {
        ...v,
        title: tr(v.title),
      };
      return newObj;
    });
  }, [filscanStore?.filscan?.lang, active]);

  const handleChange = (type: string, item: any) => {
    if (type === "active") {
      setActive(item);
      load(current, item.value);
    }
  };

  useEffect(() => {
    if (miner) load();
  }, [miner]);

  const load = (cur?: number, value?: string) => {
    const index = cur || current;
    const showValue = value || active.value;
    const linkUrl: string = apiUrl.detail_miner_list + "/" + showValue;
    postAxios(linkUrl, {
      account_id: miner,
      filters: {
        index,
        limit: pageLimit,
      },
    }).then((res: any) => {
      const result = res?.result || {};
      const result_key: string = miner_list.resultObj(showValue);
      const data = result[result_key] || [];
      setData(data);
    });
  };
  return (
    <div className={styles.miner_message_list}>
      <Tabs
        data={miner_list.title}
        ns='detail'
        defaultValue={active.value}
        onChange={(value) => handleChange("active", value)}
      />
      <div className={styles.miner_message_list_header}>
        <div>{tr(`${active.label}_total`, { value: data.total })}</div>
      </div>
      <Table
        dataSouce={data.dataSouce || []}
        total={data.total}
        columns={columns}
        current={current}
        onPage={(cur) => {
          setCurrent(cur);
          load(cur);
        }}
      />
    </div>
  );
};
